"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Zap,
  Eye,
  Heart,
  Share2,
  Users,
  Hash,
  Lightbulb,
  BarChart3,
  Loader2
} from "lucide-react"

interface PredictionData {
  viralProbability: number
  expectedEngagement: number
  expectedReach: number
  bestPostingTime: string[]
  optimalHashtags: string[]
  contentRecommendations: string[]
  competitorBenchmark: {
    averageEngagement: number
    topPerformers: string[]
  }
  confidence: number
  riskFactors: string[]
  metadata?: {
    platform: string
    contentType: string
    generatedAt: string
    dataPoints: number
  }
}

const platforms = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" }
]

const contentTypes = [
  { value: "image", label: "Image Post" },
  { value: "video", label: "Video" },
  { value: "text", label: "Text Post" },
  { value: "carousel", label: "Carousel" },
  { value: "story", label: "Story" },
  { value: "reel", label: "Reel" }
]

import { PredictiveAnalyticsDashboard } from "@/components/PredictiveAnalyticsDashboard"

export function PredictiveAnalytics() {
  return <PredictiveAnalyticsDashboard />
}