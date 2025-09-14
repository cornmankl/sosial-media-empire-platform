"use client"

import { 
  ComposedChart, 
  Area, 
  Scatter, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Enhanced performance data with more metrics
const performanceData = [
  { date: "Jan", reach: 40000, engagement: 2400, conversions: 400, revenue: 2400, virality: 65, sentiment: 0.7 },
  { date: "Feb", reach: 30000, engagement: 1398, conversions: 300, revenue: 2210, virality: 58, sentiment: 0.6 },
  { date: "Mar", reach: 20000, engagement: 9800, conversions: 200, revenue: 2290, virality: 82, sentiment: 0.8 },
  { date: "Apr", reach: 27800, engagement: 3908, conversions: 278, revenue: 2000, virality: 71, sentiment: 0.75 },
  { date: "May", reach: 18900, engagement: 4800, conversions: 189, revenue: 2181, virality: 69, sentiment: 0.72 },
  { date: "Jun", reach: 23900, engagement: 3800, conversions: 239, revenue: 2500, virality: 76, sentiment: 0.78 },
  { date: "Jul", reach: 34900, engagement: 4300, conversions: 349, revenue: 2100, virality: 84, sentiment: 0.82 },
]

const scatterData = [
  { engagement: 12.5, reach: 45000, platform: "Instagram", size: 20 },
  { engagement: 8.7, reach: 32000, platform: "Facebook", size: 15 },
  { engagement: 18.9, reach: 68000, platform: "TikTok", size: 25 },
  { engagement: 6.2, reach: 18000, platform: "YouTube", size: 12 },
  { engagement: 4.1, reach: 45000, platform: "Twitter", size: 8 },
  { engagement: 9.8, reach: 25000, platform: "LinkedIn", size: 10 },
]

const radarData = [
  { metric: "Engagement", current: 87, industry: 65 },
  { metric: "Reach", current: 92, industry: 70 },
  { metric: "Conversion", current: 78, industry: 60 },
  { metric: "Retention", current: 85, industry: 68 },
  { metric: "Sentiment", current: 90, industry: 72 },
  { metric: "Virality", current: 82, industry: 58 },
]

const funnelData = [
  { name: "Impressions", value: 100000, fill: "#8884d8" },
  { name: "Reach", value: 45000, fill: "#83a6ed" },
  { name: "Engagement", value: 12000, fill: "#8dd1e1" },
  { name: "Clicks", value: 2400, fill: "#82ca9d" },
  { name: "Conversions", value: 480, fill: "#a4de6c" },
]

const sentimentData = [
  { name: "Very Positive", value: 35, color: "#22c55e" },
  { name: "Positive", value: 33, color: "#86efac" },
  { name: "Neutral", value: 24, color: "#eab308" },
  { name: "Negative", value: 6, color: "#f97316" },
  { name: "Very Negative", value: 2, color: "#ef4444" },
]

export function PerformanceHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Heatmap</CardTitle>
        <CardDescription>Multi-metric performance visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="reach" 
              fill="#8884d8" 
              fillOpacity={0.3}
              stroke="#8884d8" 
            />
            <Bar 
              yAxisId="left"
              dataKey="engagement" 
              fill="#82ca9d" 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="virality" 
              stroke="#ff7300" 
              strokeWidth={2}
            />
            <Scatter 
              yAxisId="left"
              dataKey="sentiment" 
              fill="#ffc658" 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function EngagementScatterPlot() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement vs Reach Analysis</CardTitle>
        <CardDescription>Platform performance scatter plot</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="reach" type="number" />
            <YAxis dataKey="engagement" type="number" />
            <Tooltip 
              formatter={(value, name) => [value, name === 'engagement' ? 'Engagement Rate (%)' : 'Reach']}
              labelFormatter={(reach) => `Reach: ${reach.toLocaleString()}`}
            />
            <Scatter 
              dataKey="engagement" 
              fill="#8884d8"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-2">
          {scatterData.map((point, index) => (
            <Badge key={index} variant="outline">
              {point.platform}: {point.engagement}% engagement
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function PerformanceRadar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Radar</CardTitle>
        <CardDescription>Comparison with industry benchmarks</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Current Performance"
              dataKey="current"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Industry Average"
              dataKey="industry"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ConversionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>Customer journey visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <FunnelChart>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive
            >
              <LabelList dataKey="name" position="right" fill="#000" stroke="none" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
          {funnelData.map((stage, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium">{stage.name}</div>
              <div className="text-lg font-bold">{stage.value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {index > 0 ? `${((stage.value / funnelData[index - 1].value) * 100).toFixed(1)}%` : '100%'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function SentimentGauge() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Detailed sentiment distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={sentimentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
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
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
          {sentimentData.map((sentiment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: sentiment.color }}
              ></div>
              <span className="text-sm">{sentiment.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function AdvancedAnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <PerformanceHeatmap />
        <EngagementScatterPlot />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <PerformanceRadar />
        <ConversionFunnel />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <SentimentGauge />
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-powered analytics insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800">Strong Performance</h4>
                <p className="text-sm text-green-700">
                  Your engagement rate is 34% above industry average
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800">Growth Opportunity</h4>
                <p className="text-sm text-blue-700">
                  Virality potential increased by 18% this month
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800">Optimization Needed</h4>
                <p className="text-sm text-yellow-700">
                  Conversion rate could improve with better CTAs
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800">Sentiment Analysis</h4>
                <p className="text-sm text-purple-700">
                  68% positive sentiment indicates strong brand health
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}