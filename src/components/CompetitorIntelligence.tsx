"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Eye,
  Users,
  MessageSquare,
  Share2,
  Heart,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Calendar,
  Plus,
  RefreshCw,
  CheckCircle
} from "lucide-react"

interface CompetitorData {
  id: string
  name: string
  industry: string
  website: string
  followers: number
  engagement: number
  growth: number
  sentiment: number
  lastUpdated: string
  platforms: {
    name: string
    followers: number
    engagement: number
  }[]
  recentActivity: {
    type: string
    platform: string
    performance: number
    timestamp: string
  }[]
  strengths: string[]
  weaknesses: string[]
}

interface CompetitorAlert {
  id: string
  competitorId: string
  type: 'growth_spike' | 'engagement_drop' | 'new_campaign' | 'sentiment_change'
  severity: 'low' | 'medium' | 'high'
  message: string
  timestamp: string
}

const mockCompetitors: CompetitorData[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    industry: "Technology",
    website: "techcorp.com",
    followers: 680000,
    engagement: 8.9,
    growth: 12.1,
    sentiment: 0.75,
    lastUpdated: "2 hours ago",
    platforms: [
      { name: "LinkedIn", followers: 450000, engagement: 12.3 },
      { name: "Twitter", followers: 150000, engagement: 6.7 },
      { name: "Facebook", followers: 80000, engagement: 7.8 }
    ],
    recentActivity: [
      { type: "Product Launch", platform: "LinkedIn", performance: 89, timestamp: "1 hour ago" },
      { type: "Thought Leadership", platform: "Twitter", performance: 76, timestamp: "3 hours ago" },
      { type: "Company Update", platform: "Facebook", performance: 65, timestamp: "5 hours ago" }
    ],
    strengths: [
      "Strong LinkedIn presence",
      "High engagement in B2B space",
      "Consistent content strategy"
    ],
    weaknesses: [
      "Limited visual content",
      "Low Instagram engagement",
      "Inconsistent posting schedule"
    ]
  },
  {
    id: "2",
    name: "InnovateLab",
    industry: "Technology",
    website: "innovatelab.io",
    followers: 420000,
    engagement: 13.4,
    growth: 18.7,
    sentiment: 0.82,
    lastUpdated: "1 hour ago",
    platforms: [
      { name: "Instagram", followers: 280000, engagement: 15.2 },
      { name: "TikTok", followers: 120000, engagement: 22.1 },
      { name: "YouTube", followers: 20000, engagement: 8.9 }
    ],
    recentActivity: [
      { type: "Viral Video", platform: "TikTok", performance: 95, timestamp: "30 minutes ago" },
      { type: "Behind the Scenes", platform: "Instagram", performance: 87, timestamp: "2 hours ago" },
      { type: "Tutorial", platform: "YouTube", performance: 72, timestamp: "4 hours ago" }
    ],
    strengths: [
      "Exceptional visual content",
      "Strong TikTok presence",
      "High viral potential"
    ],
    weaknesses: [
      "Limited LinkedIn strategy",
      "Inconsistent brand voice",
      "Poor YouTube optimization"
    ]
  },
  {
    id: "3",
    name: "Digital Dynamics",
    industry: "Technology",
    website: "digitaldynamics.com",
    followers: 390000,
    engagement: 7.8,
    growth: 9.2,
    sentiment: 0.68,
    lastUpdated: "3 hours ago",
    platforms: [
      { name: "Facebook", followers: 250000, engagement: 8.9 },
      { name: "Twitter", followers: 90000, engagement: 5.2 },
      { name: "LinkedIn", followers: 50000, engagement: 9.3 }
    ],
    recentActivity: [
      { type: "Case Study", platform: "LinkedIn", performance: 78, timestamp: "2 hours ago" },
      { type: "Industry News", platform: "Twitter", performance: 62, timestamp: "4 hours ago" },
      { type: "Webinar Promotion", platform: "Facebook", performance: 71, timestamp: "6 hours ago" }
    ],
    strengths: [
      "Strong B2B content",
      "Good LinkedIn engagement",
      "Consistent posting"
    ],
    weaknesses: [
      "Low creative content",
      "Poor Twitter performance",
      "Limited multimedia"
    ]
  }
]

const mockAlerts: CompetitorAlert[] = [
  {
    id: "1",
    competitorId: "2",
    type: "growth_spike",
    severity: "high",
    message: "InnovateLab experienced 25% follower growth in the last 7 days",
    timestamp: "1 hour ago"
  },
  {
    id: "2",
    competitorId: "1",
    type: "new_campaign",
    severity: "medium",
    message: "TechCorp Solutions launched a new product campaign",
    timestamp: "3 hours ago"
  },
  {
    id: "3",
    competitorId: "3",
    type: "engagement_drop",
    severity: "medium",
    message: "Digital Dynamics engagement dropped by 15% this week",
    timestamp: "5 hours ago"
  }
]

export function CompetitorIntelligence() {
  const [competitors, setCompetitors] = useState<CompetitorData[]>(mockCompetitors)
  const [alerts, setAlerts] = useState<CompetitorAlert[]>(mockAlerts)
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500"
      case "medium": return "bg-yellow-500"
      case "low": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "growth_spike": return <TrendingUp className="h-4 w-4" />
      case "engagement_drop": return <TrendingDown className="h-4 w-4" />
      case "new_campaign": return <Zap className="h-4 w-4" />
      case "sentiment_change": return <Heart className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const totalCompetitors = competitors.length
  const avgEngagement = competitors.reduce((sum, c) => sum + c.engagement, 0) / competitors.length
  const avgGrowth = competitors.reduce((sum, c) => sum + c.growth, 0) / competitors.length
  const highPerformers = competitors.filter(c => c.engagement > 10).length

  return (
    <div className="space-y-6">
      {/* Competitor Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Competitors</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompetitors}</div>
            <p className="text-xs text-muted-foreground">Active monitoring</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 7.2%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGrowth.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Monthly growth</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPerformers}</div>
            <p className="text-xs text-muted-foreground">Above 10% engagement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Competitor Overview</TabsTrigger>
          <TabsTrigger value="alerts">Intelligence Alerts</TabsTrigger>
          <TabsTrigger value="analysis">Comparative Analysis</TabsTrigger>
          <TabsTrigger value="insights">Strategic Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Competitor Intelligence</h2>
              <p className="text-muted-foreground">Monitor and analyze your competition</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                {isRefreshing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Competitor
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competitors.map((competitor) => (
              <Card key={competitor.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCompetitor(competitor)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{competitor.name}</CardTitle>
                    <Badge variant={competitor.growth > 15 ? "default" : "secondary"}>
                      {competitor.growth > 0 ? `+${competitor.growth}%` : `${competitor.growth}%`}
                    </Badge>
                  </div>
                  <CardDescription>{competitor.industry} • {competitor.website}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Followers:</span>
                      <p className="font-medium">{(competitor.followers / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Engagement:</span>
                      <p className="font-medium">{competitor.engagement}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Platforms:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {competitor.platforms.slice(0, 3).map((platform, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {platform.name}
                        </Badge>
                      ))}
                      {competitor.platforms.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{competitor.platforms.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Recent Activity:</span>
                    <p className="text-xs mt-1">
                      {competitor.recentActivity[0]?.type} on {competitor.recentActivity[0]?.platform}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intelligence Alerts</CardTitle>
              <CardDescription>Real-time alerts about competitor activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => {
                  const competitor = competitors.find(c => c.id === alert.competitorId)
                  return (
                    <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)} mt-2`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getAlertIcon(alert.type)}
                          <span className="font-medium">{competitor?.name}</span>
                          <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Comparison</CardTitle>
                <CardDescription>How you stack up against competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competitors.map((competitor) => (
                    <div key={competitor.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{competitor.name}</span>
                        <span className="text-sm text-muted-foreground">{competitor.engagement}%</span>
                      </div>
                      <Progress value={competitor.engagement * 5} className="h-2" />
                    </div>
                  ))}
                  <div className="space-y-1 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Your Brand</span>
                      <span className="text-sm text-green-600">11.2%</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Monthly growth comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competitors.map((competitor) => (
                    <div key={competitor.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium">{competitor.name}</p>
                        <p className="text-xs text-muted-foreground">{competitor.followers.toLocaleString()} followers</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${competitor.growth > 10 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                        </p>
                        <p className="text-xs text-muted-foreground">growth</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Competitive Strengths
                </CardTitle>
                <CardDescription>What competitors do well</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {competitors.flatMap(c => c.strengths).map((strength, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Competitive Weaknesses
                </CardTitle>
                <CardDescription>Opportunities for differentiation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {competitors.flatMap(c => c.weaknesses).map((weakness, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
              <CardDescription>AI-powered competitive insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800">Content Strategy</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Focus on LinkedIn and Instagram where competitors show weakness. Increase visual content to match InnovateLab's success.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800">Growth Opportunity</h4>
                  <p className="text-sm text-green-700 mt-1">
                    TikTok presents significant opportunity as only one competitor has strong presence there.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800">Engagement Focus</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Your engagement rate is 23% above average. Leverage this strength in marketing materials.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800">Competitive Advantage</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Consistent posting schedule and balanced platform presence are key differentiators.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}