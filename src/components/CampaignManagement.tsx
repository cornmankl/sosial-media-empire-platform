"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  Play,
  Pause,
  Square,
  Edit,
  Trash2,
  Plus,
  Eye,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface Campaign {
  id: string
  name: string
  description: string
  status: "draft" | "active" | "paused" | "completed"
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

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Product Launch",
    description: "Launch our new summer collection across all platforms",
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 10000,
    spent: 6500,
    targetAudience: "Young adults 18-35 interested in fashion",
    platforms: ["instagram", "facebook", "tiktok"],
    posts: 24,
    reach: 450000,
    engagement: 8.7,
    conversions: 156,
    roi: 24.5
  },
  {
    id: "2",
    name: "Brand Awareness Q2",
    description: "Increase brand visibility and engagement",
    status: "active",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    budget: 7500,
    spent: 4200,
    targetAudience: "General audience 25-45",
    platforms: ["facebook", "linkedin", "twitter"],
    posts: 18,
    reach: 320000,
    engagement: 6.2,
    conversions: 89,
    roi: 18.3
  },
  {
    id: "3",
    name: "Holiday Sales 2023",
    description: "Holiday season promotional campaign",
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2023-12-31",
    budget: 15000,
    spent: 14800,
    targetAudience: "Holiday shoppers",
    platforms: ["instagram", "facebook", "tiktok", "youtube"],
    posts: 42,
    reach: 680000,
    engagement: 12.4,
    conversions: 234,
    roi: 31.2
  },
  {
    id: "4",
    name: "New Product Teaser",
    description: "Tease upcoming product release",
    status: "draft",
    startDate: "2024-07-15",
    endDate: "2024-08-15",
    budget: 5000,
    spent: 0,
    targetAudience: "Tech enthusiasts",
    platforms: ["twitter", "linkedin"],
    posts: 0,
    reach: 0,
    engagement: 0,
    conversions: 0,
    roi: 0
  }
]

const platformOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" }
]

const statusColors = {
  draft: "bg-gray-500",
  active: "bg-green-500",
  paused: "bg-yellow-500",
  completed: "bg-blue-500"
}

const statusIcons = {
  draft: Clock,
  active: Play,
  paused: Pause,
  completed: CheckCircle
}

export function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    targetAudience: "",
    platforms: [] as string[]
  })

  const handleStatusChange = (campaignId: string, newStatus: Campaign["status"]) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: newStatus }
        : campaign
    ))
  }

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.budget) return

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      description: newCampaign.description,
      status: "draft",
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      budget: Number(newCampaign.budget),
      spent: 0,
      targetAudience: newCampaign.targetAudience,
      platforms: newCampaign.platforms,
      posts: 0,
      reach: 0,
      engagement: 0,
      conversions: 0,
      roi: 0
    }

    setCampaigns([campaign, ...campaigns])
    setNewCampaign({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      budget: "",
      targetAudience: "",
      platforms: []
    })
    setIsCreating(false)
  }

  const getBudgetProgress = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100)
  }

  const getStatusIcon = (status: Campaign["status"]) => {
    const Icon = statusIcons[status]
    return <Icon className="h-4 w-4" />
  }

  const activeCampaigns = campaigns.filter(c => c.status === "active")
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const avgROI = campaigns.filter(c => c.roi > 0).reduce((sum, c) => sum + c.roi, 0) / campaigns.filter(c => c.roi > 0).length || 0

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalBudget / 1000).toFixed(1)}K</div>
            <p className="text-xs text-muted-foreground">All campaigns</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalSpent / 1000).toFixed(1)}K</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. ROI</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgROI.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Performance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="analytics">Campaign Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Campaigns</h2>
              <p className="text-muted-foreground">Manage your marketing campaigns</p>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </div>

          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(campaign.status)}
                            <span className="capitalize">{campaign.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <CardDescription>{campaign.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Budget</p>
                      <p className="text-sm text-muted-foreground">
                        ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                      </p>
                      <Progress value={getBudgetProgress(campaign.spent, campaign.budget)} className="mt-1" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Performance</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.reach.toLocaleString()} reach • {campaign.engagement}% engagement
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">ROI</p>
                      <p className="text-sm font-medium text-green-600">
                        {campaign.roi > 0 ? `+${campaign.roi}%` : campaign.roi}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      {campaign.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platformOptions.find(p => p.value === platform)?.label}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      {campaign.status === "draft" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(campaign.id, "active")}
                        >
                          <Play className="mr-1 h-3 w-3" />
                          Activate
                        </Button>
                      )}
                      {campaign.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(campaign.id, "paused")}
                        >
                          <Pause className="mr-1 h-3 w-3" />
                          Pause
                        </Button>
                      )}
                      {campaign.status === "paused" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(campaign.id, "active")}
                        >
                          <Play className="mr-1 h-3 w-3" />
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>
                Set up a new marketing campaign with targeting and budget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="Enter budget"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your campaign"
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={newCampaign.targetAudience}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="Describe your target audience"
                />
              </div>
              
              <div>
                <Label>Platforms</Label>
                <div className="grid gap-2 md:grid-cols-3 mt-2">
                  {platformOptions.map((platform) => (
                    <div key={platform.value} className="flex items-center space-x-2">
                      <Switch
                        id={platform.value}
                        checked={newCampaign.platforms.includes(platform.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewCampaign(prev => ({
                              ...prev,
                              platforms: [...prev.platforms, platform.value]
                            }))
                          } else {
                            setNewCampaign(prev => ({
                              ...prev,
                              platforms: prev.platforms.filter(p => p !== platform.value)
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={platform.value}>{platform.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>
                Detailed performance metrics for all campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{campaigns.length}</div>
                    <p className="text-sm text-muted-foreground">Total Campaigns</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{activeCampaigns.length}</div>
                    <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">${(totalSpent / 1000).toFixed(1)}K</div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{avgROI.toFixed(1)}%</div>
                    <p className="text-sm text-muted-foreground">Average ROI</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Top Performing Campaigns</h3>
                  <div className="space-y-2">
                    {campaigns
                      .filter(c => c.roi > 0)
                      .sort((a, b) => b.roi - a.roi)
                      .slice(0, 3)
                      .map((campaign) => (
                        <div key={campaign.id} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-muted-foreground">{campaign.platforms.join(", ")}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">+{campaign.roi}% ROI</p>
                            <p className="text-sm text-muted-foreground">${campaign.spent.toLocaleString()} spent</p>
                          </div>
                        </div>
                      ))}
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