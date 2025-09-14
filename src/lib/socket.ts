import { Server } from 'socket.io'

export interface RealTimeMetrics {
  platform: string
  metric: string
  value: number
  timestamp: Date
  userId: string
}

export interface AnalyticsUpdate {
  platform: string
  impressions: number
  engagement: number
  reach: number
  timestamp: Date
}

export interface CampaignUpdate {
  campaignId: string
  status: string
  spent: number
  performance: number
  timestamp: Date
}

export interface CompetitorUpdate {
  competitorId: string
  metric: string
  value: number
  change: number
  timestamp: Date
}

export const setupSocket = (io: Server) => {
  // Store connected users and their subscriptions
  const userSubscriptions = new Map<string, Set<string>>()
  const platformSubscriptions = new Map<string, Set<string>>()

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    // User authentication and room joining
    socket.on('user:connect', (userData: { userId: string; email: string }) => {
      socket.userId = userData.userId
      socket.join(`user:${userData.userId}`)
      
      // Initialize user subscriptions
      if (!userSubscriptions.has(userData.userId)) {
        userSubscriptions.set(userData.userId, new Set())
      }
      
      console.log(`User ${userData.userId} connected`)
    })

    // Subscribe to platform-specific metrics
    socket.on('subscribe:platform', (platform: string) => {
      if (socket.userId) {
        socket.join(`platform:${platform}`)
        
        // Track subscription
        const userPlatforms = userSubscriptions.get(socket.userId) || new Set()
        userPlatforms.add(platform)
        userSubscriptions.set(socket.userId, userPlatforms)
        
        if (!platformSubscriptions.has(platform)) {
          platformSubscriptions.set(platform, new Set())
        }
        platformSubscriptions.get(platform)?.add(socket.userId)
        
        console.log(`User ${socket.userId} subscribed to ${platform}`)
      }
    })

    // Unsubscribe from platform metrics
    socket.on('unsubscribe:platform', (platform: string) => {
      if (socket.userId) {
        socket.leave(`platform:${platform}`)
        
        // Remove subscription tracking
        const userPlatforms = userSubscriptions.get(socket.userId) || new Set()
        userPlatforms.delete(platform)
        
        const platformUsers = platformSubscriptions.get(platform) || new Set()
        platformUsers.delete(socket.userId)
        
        console.log(`User ${socket.userId} unsubscribed from ${platform}`)
      }
    })

    // Subscribe to campaign updates
    socket.on('subscribe:campaign', (campaignId: string) => {
      socket.join(`campaign:${campaignId}`)
      console.log(`Client ${socket.id} subscribed to campaign ${campaignId}`)
    })

    // Subscribe to competitor intelligence
    socket.on('subscribe:competitors', () => {
      socket.join('competitors')
      console.log(`Client ${socket.id} subscribed to competitor updates`)
    })

    // Handle real-time analytics updates
    socket.on('analytics:update', (data: AnalyticsUpdate) => {
      // Broadcast to all users subscribed to this platform
      io.to(`platform:${data.platform}`).emit('analytics:updated', data)
    })

    // Handle campaign updates
    socket.on('campaign:update', (data: CampaignUpdate) => {
      io.to(`campaign:${data.campaignId}`).emit('campaign:updated', data)
    })

    // Handle competitor updates
    socket.on('competitor:update', (data: CompetitorUpdate) => {
      io.to('competitors').emit('competitor:updated', data)
    })

    // Request initial data
    socket.on('request:initial-data', async (userData: { userId: string }) => {
      try {
        // Emit initial analytics data
        socket.emit('initial:analytics', {
          platforms: ['facebook', 'instagram', 'tiktok', 'youtube'],
          timestamp: new Date()
        })
        
        // Emit initial campaigns data
        socket.emit('initial:campaigns', {
          campaigns: [],
          timestamp: new Date()
        })
        
        // Emit initial competitor data
        socket.emit('initial:competitors', {
          competitors: [],
          timestamp: new Date()
        })
        
      } catch (error) {
        console.error('Error sending initial data:', error)
        socket.emit('error', { message: 'Failed to load initial data' })
      }
    })

    // Handle messages (backward compatibility)
    socket.on('message', (msg: { text: string; senderId: string }) => {
      // Echo: broadcast message only the client who send the message
      socket.emit('message', {
        text: `Echo: ${msg.text}`,
        senderId: 'system',
        timestamp: new Date().toISOString(),
      })
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
      
      // Clean up subscriptions
      if (socket.userId) {
        const userPlatforms = userSubscriptions.get(socket.userId) || new Set()
        userPlatforms.forEach(platform => {
          const platformUsers = platformSubscriptions.get(platform) || new Set()
          platformUsers.delete(socket.userId)
        })
        userSubscriptions.delete(socket.userId)
      }
    })

    // Send welcome message
    socket.emit('message', {
      text: 'Welcome to Social Media Empire Real-time Platform!',
      senderId: 'system',
      timestamp: new Date().toISOString(),
    })
  })

  // Simulate real-time data updates (in production, this would come from actual data sources)
  setInterval(() => {
    // Simulate platform metrics updates
    const platforms = ['facebook', 'instagram', 'tiktok', 'youtube']
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)]
    
    const analyticsUpdate: AnalyticsUpdate = {
      platform: randomPlatform,
      impressions: Math.floor(Math.random() * 10000) + 1000,
      engagement: Math.random() * 20,
      reach: Math.floor(Math.random() * 50000) + 5000,
      timestamp: new Date()
    }
    
    io.to(`platform:${randomPlatform}`).emit('analytics:updated', analyticsUpdate)
    
    // Simulate campaign updates
    io.emit('system:heartbeat', {
      timestamp: new Date(),
      connectedClients: io.sockets.server.sockets.sockets.size
    })
  }, 5000) // Update every 5 seconds
}