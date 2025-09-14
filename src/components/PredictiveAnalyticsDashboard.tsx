"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Zap,
  Loader2
} from "lucide-react"

// Mock data for predictive analytics
const engagementData = [
  { date: "Jan", actual: 4000, predicted: 4200 },
  { date: "Feb", actual: 3000, predicted: 3500 },
  { date: "Mar", actual: 2000, predicted: 2200 },
  { date: "Apr", actual: 2780, predicted: 3000 },
  { date: "May", actual: 1890, predicted: 2100 },
  { date: "Jun", actual: 2390, predicted: 2500 },
  { date: "Jul", actual: 3490, predicted: 3200 },
  { date: "Aug", actual: null, predicted: 3800 },
  { date: "Sep", actual: null, predicted: 4100 },
  { date: "Oct", actual: null, predicted: 4500 },
]

const platformPredictions = [
  { platform: "Facebook", current: 124000, predicted: 135000, growth: 8.8 },
  { platform: "Instagram", current: 89000, predicted: 98000, growth: 10.1 },
  { platform: "TikTok", current: 234000, predicted: 275000, growth: 17.5 },
  { platform: "YouTube", current: 45000, predicted: 52000, growth: 15.6 },
  { platform: "Twitter", current: 12000, predicted: 14500, growth: 20.8 },
]

const contentRecommendations = [
  { type: "Video Content", reason: "High engagement on video posts", priority: "High" },
  { type: "Behind the Scenes", reason: "Growing interest in authentic content", priority: "Medium" },
  { type: "User-Generated Content", reason: "Increases community engagement", priority: "High" },
  { type: "Educational Posts", reason: "Establishes thought leadership", priority: "Medium" },
]

export function PredictiveAnalyticsDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const runAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Predictive Analytics Dashboard
          </CardTitle>
          <CardDescription>
            AI-powered insights and predictions for your social media performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={runAnalysis} 
              disabled={isAnalyzing}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Data...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Run Predictive Analysis
                </>
              )}
            </Button>
            
            {analysisComplete && (
              <div className="flex-1 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  Analysis complete! Predictions updated with latest data.
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Engagement Prediction Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Prediction</CardTitle>
                <CardDescription>
                  Historical data vs predicted future performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Actual Engagement"
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Predicted Engagement"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Platform Growth Predictions */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth Predictions</CardTitle>
                <CardDescription>
                  Projected follower growth over the next quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [value.toLocaleString(), "Followers"]}
                      labelFormatter={(platform) => `Platform: ${platform}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="current" 
                      fill="#8884d8" 
                      name="Current Followers"
                    />
                    <Bar 
                      dataKey="predicted" 
                      fill="#82ca9d" 
                      name="Predicted Followers"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Key Insights
                </CardTitle>
                <CardDescription>
                  AI-generated recommendations for optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800">Content Strategy</h4>
                    <p className="text-sm text-blue-700">
                      Video content is projected to drive 35% more engagement than static posts
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                    <h4 className="font-medium text-purple-800">Platform Focus</h4>
                    <p className="text-sm text-purple-700">
                      TikTok shows the highest growth potential with 17.5% projected increase
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="font-medium text-green-800">Timing Optimization</h4>
                    <p className="text-sm text-green-700">
                      Posting between 7-9 AM and 6-8 PM maximizes reach by 28%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Content Recommendations</CardTitle>
                <CardDescription>
                  AI-suggested content types for maximum engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentRecommendations.map((recommendation, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <h4 className="font-medium">{recommendation.type}</h4>
                        <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        recommendation.priority === "High" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {recommendation.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Accuracy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Prediction Accuracy
              </CardTitle>
              <CardDescription>
                Confidence levels for our predictive models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 border rounded-md">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-muted-foreground">Engagement</div>
                </div>
                <div className="text-center p-4 border rounded-md">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-muted-foreground">Follower Growth</div>
                </div>
                <div className="text-center p-4 border rounded-md">
                  <div className="text-2xl font-bold text-yellow-600">78%</div>
                  <div className="text-sm text-muted-foreground">Content Performance</div>
                </div>
                <div className="text-center p-4 border rounded-md">
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-sm text-muted-foreground">Sentiment Analysis</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}