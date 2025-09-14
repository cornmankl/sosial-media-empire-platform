import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types
export interface Campaign {
  id: string
  name: string
  description: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate: string
  endDate: string
  budget: number
  spent: number
  targetAudience: string
  platforms: string[]
  posts: number
  reach: number
  engagement: number
  conversions: number
  roi: number
}

export interface Platform {
  id: string
  name: string
  isConnected: boolean
  isActive: boolean
  followers: number
  engagement: number
  lastSync: string
}

export interface Analytics {
  platform: string
  impressions: number
  engagement: number
  reach: number
  timestamp: string
}

export interface Competitor {
  id: string
  name: string
  followers: number
  engagement: number
  growth: number
  sentiment: number
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    email: boolean
    push: boolean
    automation: boolean
  }
  dashboard: {
    defaultView: string
    refreshInterval: number
  }
}

export interface SocialMediaState {
  // Data
  campaigns: Campaign[]
  platforms: Platform[]
  analytics: Analytics[]
  competitors: Competitor[]
  
  // UI State
  isLoading: boolean
  selectedPlatform: string | null
  selectedCampaign: string | null
  
  // User Settings
  settings: UserSettings
  
  // Actions
  // Campaigns
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  setCampaignStatus: (id: string, status: Campaign['status']) => void
  
  // Platforms
  addPlatform: (platform: Omit<Platform, 'id'>) => void
  updatePlatform: (id: string, updates: Partial<Platform>) => void
  removePlatform: (id: string) => void
  togglePlatformActive: (id: string) => void
  
  // Analytics
  updateAnalytics: (analytics: Analytics[]) => void
  addAnalytics: (analytics: Analytics) => void
  
  // Competitors
  addCompetitor: (competitor: Omit<Competitor, 'id'>) => void
  updateCompetitor: (id: string, updates: Partial<Competitor>) => void
  removeCompetitor: (id: string) => void
  
  // UI State
  setLoading: (loading: boolean) => void
  setSelectedPlatform: (platform: string | null) => void
  setSelectedCampaign: (campaign: string | null) => void
  
  // Settings
  updateSettings: (settings: Partial<UserSettings>) => void
  
  // Data Fetching
  fetchCampaigns: () => Promise<void>
  fetchPlatforms: () => Promise<void>
  fetchAnalytics: () => Promise<void>
  fetchCompetitors: () => Promise<void>
}

// Create the store
export const useSocialMediaStore = create<SocialMediaState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        campaigns: [],
        platforms: [],
        analytics: [],
        competitors: [],
        isLoading: false,
        selectedPlatform: null,
        selectedCampaign: null,
        settings: {
          theme: 'system',
          notifications: {
            email: true,
            push: true,
            automation: true
          },
          dashboard: {
            defaultView: 'overview',
            refreshInterval: 30000 // 30 seconds
          }
        },

        // Campaign Actions
        addCampaign: (campaignData) => {
          const campaign: Campaign = {
            ...campaignData,
            id: Date.now().toString()
          }
          set((state) => ({
            campaigns: [campaign, ...state.campaigns]
          }))
        },

        updateCampaign: (id, updates) => {
          set((state) => ({
            campaigns: state.campaigns.map((campaign) =>
              campaign.id === id ? { ...campaign, ...updates } : campaign
            )
          }))
        },

        deleteCampaign: (id) => {
          set((state) => ({
            campaigns: state.campaigns.filter((campaign) => campaign.id !== id)
          }))
        },

        setCampaignStatus: (id, status) => {
          set((state) => ({
            campaigns: state.campaigns.map((campaign) =>
              campaign.id === id ? { ...campaign, status } : campaign
            )
          }))
        },

        // Platform Actions
        addPlatform: (platformData) => {
          const platform: Platform = {
            ...platformData,
            id: Date.now().toString()
          }
          set((state) => ({
            platforms: [...state.platforms, platform]
          }))
        },

        updatePlatform: (id, updates) => {
          set((state) => ({
            platforms: state.platforms.map((platform) =>
              platform.id === id ? { ...platform, ...updates } : platform
            )
          }))
        },

        removePlatform: (id) => {
          set((state) => ({
            platforms: state.platforms.filter((platform) => platform.id !== id)
          }))
        },

        togglePlatformActive: (id) => {
          set((state) => ({
            platforms: state.platforms.map((platform) =>
              platform.id === id 
                ? { ...platform, isActive: !platform.isActive }
                : platform
            )
          }))
        },

        // Analytics Actions
        updateAnalytics: (newAnalytics) => {
          set({ analytics: newAnalytics })
        },

        addAnalytics: (analytics) => {
          set((state) => ({
            analytics: [...state.analytics, analytics]
          }))
        },

        // Competitor Actions
        addCompetitor: (competitorData) => {
          const competitor: Competitor = {
            ...competitorData,
            id: Date.now().toString()
          }
          set((state) => ({
            competitors: [...state.competitors, competitor]
          }))
        },

        updateCompetitor: (id, updates) => {
          set((state) => ({
            competitors: state.competitors.map((competitor) =>
              competitor.id === id ? { ...competitor, ...updates } : competitor
            )
          }))
        },

        removeCompetitor: (id) => {
          set((state) => ({
            competitors: state.competitors.filter((competitor) => competitor.id !== id)
          }))
        },

        // UI State Actions
        setLoading: (loading) => {
          set({ isLoading: loading })
        },

        setSelectedPlatform: (platform) => {
          set({ selectedPlatform: platform })
        },

        setSelectedCampaign: (campaign) => {
          set({ selectedCampaign: campaign })
        },

        // Settings Actions
        updateSettings: (newSettings) => {
          set((state) => ({
            settings: { ...state.settings, ...newSettings }
          }))
        },

        // Data Fetching Actions
        fetchCampaigns: async () => {
          set({ isLoading: true })
          try {
            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            const mockCampaigns: Campaign[] = [
              {
                id: '1',
                name: 'Summer Product Launch',
                description: 'Launch our new summer collection',
                status: 'active',
                startDate: '2024-06-01',
                endDate: '2024-08-31',
                budget: 10000,
                spent: 6500,
                targetAudience: 'Young adults 18-35',
                platforms: ['instagram', 'facebook'],
                posts: 24,
                reach: 450000,
                engagement: 8.7,
                conversions: 156,
                roi: 24.5
              }
            ]
            
            set({ campaigns: mockCampaigns })
          } catch (error) {
            console.error('Failed to fetch campaigns:', error)
          } finally {
            set({ isLoading: false })
          }
        },

        fetchPlatforms: async () => {
          try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 500))
            
            const mockPlatforms: Platform[] = [
              {
                id: '1',
                name: 'Facebook',
                isConnected: true,
                isActive: true,
                followers: 124000,
                engagement: 8.7,
                lastSync: '2 minutes ago'
              },
              {
                id: '2',
                name: 'Instagram',
                isConnected: true,
                isActive: true,
                followers: 89000,
                engagement: 12.3,
                lastSync: '5 minutes ago'
              }
            ]
            
            set({ platforms: mockPlatforms })
          } catch (error) {
            console.error('Failed to fetch platforms:', error)
          }
        },

        fetchAnalytics: async () => {
          try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 300))
            
            const mockAnalytics: Analytics[] = [
              {
                platform: 'facebook',
                impressions: 45000,
                engagement: 8.7,
                reach: 32000,
                timestamp: new Date().toISOString()
              }
            ]
            
            set({ analytics: mockAnalytics })
          } catch (error) {
            console.error('Failed to fetch analytics:', error)
          }
        },

        fetchCompetitors: async () => {
          try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 400))
            
            const mockCompetitors: Competitor[] = [
              {
                id: '1',
                name: 'TechCorp Solutions',
                followers: 680000,
                engagement: 8.9,
                growth: 12.1,
                sentiment: 0.75
              }
            ]
            
            set({ competitors: mockCompetitors })
          } catch (error) {
            console.error('Failed to fetch competitors:', error)
          }
        }
      }),
      {
        name: 'social-media-store',
        // Only persist these fields
        partialize: (state) => ({
          settings: state.settings
        })
      }
    ),
    {
      name: 'Social Media Store'
    }
  )
)