import { useQuery } from '@tanstack/react-query'

interface AnalyticsData {
  platform: string
  impressions: number
  engagement: number
  reach: number
  timestamp: string
}

interface CampaignData {
  id: string
  name: string
  status: string
  budget: number
  spent: number
  performance: number
}

interface CompetitorData {
  id: string
  name: string
  followers: number
  engagement: number
  growth: number
}

// Analytics hooks
export function useAnalytics(platform?: string) {
  return useQuery({
    queryKey: ['analytics', platform],
    queryFn: async () => {
      const response = await fetch(`/api/analytics${platform ? `?platform=${platform}` : ''}`)
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }
      return response.json() as Promise<AnalyticsData[]>
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2
  })
}

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaigns')
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns')
      }
      return response.json() as Promise<CampaignData[]>
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    refetchOnWindowFocus: false
  })
}

export function useCompetitors() {
  return useQuery({
    queryKey: ['competitors'],
    queryFn: async () => {
      const response = await fetch('/api/competitors')
      if (!response.ok) {
        throw new Error('Failed to fetch competitors')
      }
      return response.json() as Promise<CompetitorData[]>
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  })
}

// Real-time data hooks
export function useRealTimeMetrics(platform: string) {
  return useQuery({
    queryKey: ['realtime', platform],
    queryFn: async () => {
      const response = await fetch(`/api/realtime?platform=${platform}`)
      if (!response.ok) {
        throw new Error('Failed to fetch real-time metrics')
      }
      return response.json()
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true
  })
}

// Predictive analytics hook
export function usePredictiveAnalytics(platform: string, contentType: string) {
  return useQuery({
    queryKey: ['predictive', platform, contentType],
    queryFn: async () => {
      const response = await fetch('/api/predictive-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          contentType,
          historicalData: []
        })
      })
      if (!response.ok) {
        throw new Error('Failed to generate predictions')
      }
      return response.json()
    },
    enabled: !!platform && !!contentType,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1
  })
}

// Social platform hooks
export function useSocialPlatforms() {
  return useQuery({
    queryKey: ['social-platforms'],
    queryFn: async () => {
      const response = await fetch('/api/social-platforms')
      if (!response.ok) {
        throw new Error('Failed to fetch social platforms')
      }
      return response.json()
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false
  })
}

// Content generation hooks
export function useAIContent(prompt: string, platform: string) {
  return useQuery({
    queryKey: ['ai-content', prompt, platform],
    queryFn: async () => {
      const response = await fetch('/api/ai-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          platform,
          contentType: 'general',
          tone: 'professional'
        })
      })
      if (!response.ok) {
        throw new Error('Failed to generate AI content')
      }
      return response.json()
    },
    enabled: !!prompt && !!platform,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1
  })
}