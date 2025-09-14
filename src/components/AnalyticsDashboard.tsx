"use client"

import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdvancedAnalyticsDashboard } from "@/components/AdvancedCharts"

// Mock data for analytics
const performanceData = [
  { date: "Jan", reach: 40000, engagement: 2400, conversions: 400, revenue: 2400 },
  { date: "Feb", reach: 30000, engagement: 1398, conversions: 300, revenue: 2210 },
  { date: "Mar", reach: 20000, engagement: 9800, conversions: 200, revenue: 2290 },
  { date: "Apr", reach: 27800, engagement: 3908, conversions: 278, revenue: 2000 },
  { date: "May", reach: 18900, engagement: 4800, conversions: 189, revenue: 2181 },
  { date: "Jun", reach: 23900, engagement: 3800, conversions: 239, revenue: 2500 },
  { date: "Jul", reach: 34900, engagement: 4300, conversions: 349, revenue: 2100 },
]

const platformData = [
  { platform: "Facebook", followers: 124000, engagement: 8.7, reach: 450000, color: "#1877F2" },
  { platform: "Instagram", followers: 89000, engagement: 12.3, reach: 320000, color: "#E4405F" },
  { platform: "TikTok", followers: 234000, engagement: 18.9, reach: 680000, color: "#000000" },
  { platform: "YouTube", followers: 45000, engagement: 6.2, reach: 180000, color: "#FF0000" },
  { platform: "Twitter", followers: 12000, engagement: 4.1, reach: 45000, color: "#1DA1F2" },
  { platform: "LinkedIn", followers: 8000, engagement: 9.8, reach: 25000, color: "#0A66C2" },
]

const contentPerformance = [
  { type: "Images", count: 45, engagement: 12.5, virality: 78 },
  { type: "Videos", count: 23, engagement: 18.7, virality: 92 },
  { type: "Text", count: 67, engagement: 6.2, virality: 45 },
  { type: "Stories", count: 34, engagement: 15.3, virality: 88 },
  { type: "Reels", count: 12, engagement: 22.1, virality: 95 },
]

const competitorData = [
  { name: "Your Brand", followers: 512000, engagement: 11.2, growth: 15.3 },
  { name: "Competitor A", followers: 680000, engagement: 8.9, growth: 12.1 },
  { name: "Competitor B", followers: 420000, engagement: 13.4, growth: 18.7 },
  { name: "Competitor C", followers: 390000, engagement: 7.8, growth: 9.2 },
]

const sentimentData = [
  { name: "Positive", value: 68, color: "#22c55e" },
  { name: "Neutral", value: 24, color: "#eab308" },
  { name: "Negative", value: 8, color: "#ef4444" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Badge variant="secondary">+12%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <Badge variant="secondary">+2.3%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 5.2%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Badge variant="secondary">+18%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <Badge variant="secondary">+24%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.2K</div>
            <p className="text-xs text-muted-foreground">From social channels</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Performance Trend */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Monthly performance metrics across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reach" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Followers and engagement by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="followers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Engagement by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={contentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competitor Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>Market position and growth comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={competitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Brand sentiment distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Details */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Details</CardTitle>
          <CardDescription>Detailed metrics for each social platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformData.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: platform.color }}
                  ></div>
                  <div>
                    <h3 className="font-medium">{platform.platform}</h3>
                    <p className="text-sm text-muted-foreground">
                      {platform.followers.toLocaleString()} followers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{platform.engagement}% engagement</p>
                  <p className="text-sm text-muted-foreground">
                    {platform.reach.toLocaleString()} reach
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics */}
      <AdvancedAnalyticsDashboard />
    </div>
  )
}