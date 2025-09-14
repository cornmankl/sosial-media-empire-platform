"use client"

import { useState } from "react"
import { 
  BarChart3, 
  Brain, 
  Calendar, 
  Campaign, 
  Home, 
  Inbox, 
  Menu, 
  MessageSquare, 
  Settings, 
  TrendingUp, 
  Users,
  X,
  Zap,
  Target,
  Shield,
  Database,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { AIContentStudio } from "@/components/AIContentStudio"
import { SocialPlatformIntegration } from "@/components/SocialPlatformIntegration"
import { CampaignManagement } from "@/components/CampaignManagement"
import { PredictiveAnalytics } from "@/components/PredictiveAnalytics"
import { CompetitorIntelligence } from "@/components/CompetitorIntelligence"
import { CampaignAutomation } from "@/components/CampaignAutomation"
import { ThemeToggle } from "@/components/ThemeToggle"
import { ApiHealthCheck } from "@/components/ApiHealthCheck"
import { RealTimeTest } from "@/components/RealTimeTest"
import { ComprehensiveSystemTest } from "@/components/ComprehensiveSystemTest"
import { useAppShortcuts } from "@/hooks/useKeyboardShortcuts"

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Analytics", href: "#", icon: BarChart3, current: false },
  { name: "Content Studio", href: "#", icon: Brain, current: false },
  { name: "Campaigns", href: "#", icon: Campaign, current: false },
  { name: "Social Platforms", href: "#", icon: Globe, current: false },
  { name: "AI Assistant", href: "#", icon: Zap, current: false },
  { name: "Competitor Intel", href: "#", icon: Target, current: false },
  { name: "Trends", href: "#", icon: TrendingUp, current: false },
  { name: "Audience", href: "#", icon: Users, current: false },
  { name: "Messages", href: "#", icon: MessageSquare, current: false },
  { name: "Data Hub", href: "#", icon: Database, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
]

const stats = [
  { name: "Total Reach", value: "2.4M", change: "+12%", changeType: "positive" },
  { name: "Engagement", value: "8.7%", change: "+2.3%", changeType: "positive" },
  { name: "Conversions", value: "1,234", change: "+18%", changeType: "positive" },
  { name: "Revenue", value: "$45.2K", change: "+24%", changeType: "positive" },
]

const recentActivity = [
  { id: 1, action: "Post published on Instagram", platform: "Instagram", time: "2 min ago", status: "success" },
  { id: 2, action: "AI content generated", platform: "Content Studio", time: "15 min ago", status: "success" },
  { id: 3, action: "Campaign performance alert", platform: "Analytics", time: "1 hour ago", status: "warning" },
  { id: 4, action: "Competitor analysis updated", platform: "Intel", time: "2 hours ago", status: "success" },
]

const platforms = [
  { name: "Facebook", status: "connected", followers: "124K", color: "bg-blue-600" },
  { name: "Instagram", status: "connected", followers: "89K", color: "bg-pink-600" },
  { name: "TikTok", status: "connected", followers: "234K", color: "bg-black" },
  { name: "YouTube", status: "connected", followers: "45K", color: "bg-red-600" },
  { name: "Twitter", status: "disconnected", followers: "12K", color: "bg-sky-500" },
  { name: "LinkedIn", status: "connected", followers: "8K", color: "bg-blue-700" },
]

export default function Home() {
  useAppShortcuts() // Initialize keyboard shortcuts
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-card">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-xl font-bold">Social Empire</h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="mt-8 px-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1",
                  item.current
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card px-6 py-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-xl font-bold">Social Empire</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-semibold",
                          item.current
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h2 className="text-lg font-semibold">Data-Integrated Social Media Empire</h2>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm">
                <Inbox className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <Card key={stat.name}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main content tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="social-integration">Social Integration</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="campaign-automation">Automation</TabsTrigger>
                <TabsTrigger value="predictive-analytics">Predictive AI</TabsTrigger>
                <TabsTrigger value="competitor-intel">Competitor Intel</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="ai-studio">AI Studio</TabsTrigger>
                <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>
                        Your social media performance across all platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <AnalyticsDashboard />
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest updates from your social empire
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-4">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.platform} • {activity.time}</p>
                            </div>
                            <Badge variant={activity.status === "success" ? "default" : "secondary"}>
                              {activity.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* API Health Check */}
                <ApiHealthCheck />
                
                {/* Real-time Test */}
                <RealTimeTest />
                
                {/* Comprehensive System Test */}
                <ComprehensiveSystemTest />
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {platforms.map((platform) => (
                    <Card key={platform.name}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{platform.name}</CardTitle>
                        <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{platform.followers}</div>
                        <p className="text-xs text-muted-foreground">Followers</p>
                        <div className="mt-2">
                          <Badge variant={platform.status === "connected" ? "default" : "secondary"}>
                            {platform.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="social-integration" className="space-y-4">
                <SocialPlatformIntegration />
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-4">
                <CampaignManagement />
              </TabsContent>

              <TabsContent value="campaign-automation" className="space-y-4">
                <CampaignAutomation />
              </TabsContent>

              <TabsContent value="predictive-analytics" className="space-y-4">
                <PredictiveAnalytics />
              </TabsContent>

              <TabsContent value="competitor-intel" className="space-y-4">
                <CompetitorIntelligence />
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>
                      Complete activity history across all platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${
                              activity.status === "success" ? "bg-green-500" : "bg-yellow-500"
                            }`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.platform} • {activity.time}</p>
                          </div>
                          <Badge variant={activity.status === "success" ? "default" : "secondary"}>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-studio" className="space-y-4">
                <AIContentStudio />
              </TabsContent>

              <TabsContent value="ai-insights" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Content Generation
                      </CardTitle>
                      <CardDescription>
                        AI-powered content creation and optimization
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Content Generated Today</span>
                          <span className="font-medium">24</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Average Engagement Score</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Viral Potential</span>
                          <span className="font-medium text-green-600">High</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Brand Intelligence
                      </CardTitle>
                      <CardDescription>
                        AI-powered brand monitoring and insights
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Brand Sentiment</span>
                          <span className="font-medium text-green-600">Positive</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Competitor Alerts</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Trending Topics</span>
                          <span className="font-medium">12</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}