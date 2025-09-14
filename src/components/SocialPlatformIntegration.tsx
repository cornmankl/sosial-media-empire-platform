"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Music,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  Settings,
  RefreshCw,
  Users,
  TrendingUp,
  MessageSquare,
  Share2
} from "lucide-react"

interface PlatformAccount {
  id: string
  platform: string
  username: string
  displayName: string
  followers: number
  isConnected: boolean
  isActive: boolean
  lastSync: string
  avatar?: string
}

const mockAccounts: PlatformAccount[] = [
  {
    id: "1",
    platform: "facebook",
    username: "yourbrand",
    displayName: "Your Brand",
    followers: 124000,
    isConnected: true,
    isActive: true,
    lastSync: "2 minutes ago",
    avatar: "📘"
  },
  {
    id: "2",
    platform: "instagram",
    username: "yourbrand",
    displayName: "Your Brand",
    followers: 89000,
    isConnected: true,
    isActive: true,
    lastSync: "5 minutes ago",
    avatar: "📷"
  },
  {
    id: "3",
    platform: "tiktok",
    username: "yourbrand",
    displayName: "Your Brand",
    followers: 234000,
    isConnected: true,
    isActive: true,
    lastSync: "1 hour ago",
    avatar: "🎵"
  },
  {
    id: "4",
    platform: "youtube",
    username: "yourbrand",
    displayName: "Your Brand",
    followers: 45000,
    isConnected: true,
    isActive: true,
    lastSync: "30 minutes ago",
    avatar: "📺"
  },
  {
    id: "5",
    platform: "twitter",
    username: "yourbrand",
    displayName: "Your Brand",
    followers: 12000,
    isConnected: false,
    isActive: false,
    lastSync: "2 days ago",
    avatar: "🐦"
  },
  {
    id: "6",
    platform: "linkedin",
    username: "yourbrand",
    displayName: "Your Brand",
    followers: 8000,
    isConnected: true,
    isActive: true,
    lastSync: "15 minutes ago",
    avatar: "💼"
  }
]

const platformConfig = {
  facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    description: "Connect to Facebook Pages and Groups"
  },
  instagram: {
    name: "Instagram",
    icon: Instagram,
    color: "bg-pink-600",
    description: "Connect to Instagram Business Accounts"
  },
  tiktok: {
    name: "TikTok",
    icon: Music,
    color: "bg-black",
    description: "Connect to TikTok Business Accounts"
  },
  youtube: {
    name: "YouTube",
    icon: Youtube,
    color: "bg-red-600",
    description: "Connect to YouTube Channels"
  },
  twitter: {
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500",
    description: "Connect to Twitter Accounts"
  },
  linkedin: {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700",
    description: "Connect to LinkedIn Company Pages"
  }
}

export function SocialPlatformIntegration() {
  const [accounts, setAccounts] = useState<PlatformAccount[]>(mockAccounts)
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleConnect = async (platform: string) => {
    setIsConnecting(platform)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setAccounts(prev => prev.map(account => 
      account.platform === platform 
        ? { ...account, isConnected: true, isActive: true, lastSync: "Just now" }
        : account
    ))
    
    setIsConnecting(null)
  }

  const handleToggleActive = (accountId: string, isActive: boolean) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, isActive }
        : account
    ))
  }

  const handleSync = async (accountId: string) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, lastSync: "Syncing..." }
        : account
    ))
    
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, lastSync: "Just now" }
        : account
    ))
  }

  const getPlatformIcon = (platform: string) => {
    const config = platformConfig[platform as keyof typeof platformConfig]
    return config ? config.icon : Facebook
  }

  const getPlatformColor = (platform: string) => {
    const config = platformConfig[platform as keyof typeof platformConfig]
    return config ? config.color : "bg-gray-600"
  }

  const connectedAccounts = accounts.filter(acc => acc.isConnected)
  const totalFollowers = connectedAccounts.reduce((sum, acc) => sum + acc.followers, 0)

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Platforms</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedAccounts.length}</div>
            <p className="text-xs text-muted-foreground">Out of {accounts.length} platforms</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalFollowers / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedAccounts.filter(acc => acc.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Ready for posting</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accounts.filter(acc => acc.lastSync !== "2 days ago").length}
            </div>
            <p className="text-xs text-muted-foreground">Recently synced</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connected" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connected">Connected Platforms</TabsTrigger>
          <TabsTrigger value="available">Available Platforms</TabsTrigger>
          <TabsTrigger value="settings">Integration Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Social Platforms</CardTitle>
              <CardDescription>
                Manage your connected social media accounts and their settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accounts.filter(acc => acc.isConnected).map((account) => {
                  const IconComponent = getPlatformIcon(account.platform)
                  const config = platformConfig[account.platform as keyof typeof platformConfig]
                  
                  return (
                    <div key={account.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${getPlatformColor(account.platform)} flex items-center justify-center text-white`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{config.name}</h3>
                              <p className="text-sm text-muted-foreground">@{account.username}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{account.followers.toLocaleString()} followers</p>
                            <p className="text-xs text-muted-foreground">Last sync: {account.lastSync}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={account.isActive}
                              onCheckedChange={(checked) => handleToggleActive(account.id, checked)}
                            />
                            <span className="text-sm">{account.isActive ? 'Active' : 'Inactive'}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSync(account.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Platforms</CardTitle>
              <CardDescription>
                Connect more social media platforms to expand your reach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(platformConfig).map(([platformKey, config]) => {
                  const account = accounts.find(acc => acc.platform === platformKey)
                  const IconComponent = config.icon
                  
                  return (
                    <Card key={platformKey} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 rounded ${config.color} flex items-center justify-center text-white`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-lg">{config.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                        
                        {account?.isConnected ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Connected</span>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => handleConnect(platformKey)}
                            disabled={isConnecting === platformKey}
                            className="w-full"
                          >
                            {isConnecting === platformKey ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <Plus className="mr-2 h-4 w-4" />
                                Connect
                              </>
                            )}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure how your platforms integrate with the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Auto-Sync Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automatic Data Sync</p>
                        <p className="text-sm text-muted-foreground">Sync data every 30 minutes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Real-time Updates</p>
                        <p className="text-sm text-muted-foreground">Get instant notifications</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Content Publishing</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cross-Platform Posting</p>
                        <p className="text-sm text-muted-foreground">Post to multiple platforms at once</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-Optimize Content</p>
                        <p className="text-sm text-muted-foreground">Adjust content for each platform</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Data & Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Advanced Analytics</p>
                        <p className="text-sm text-muted-foreground">Collect detailed performance data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Competitor Tracking</p>
                        <p className="text-sm text-muted-foreground">Monitor competitor performance</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}