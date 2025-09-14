"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Filter,
  Search,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  X,
  RotateCcw
} from "lucide-react"

interface FilterConfig {
  platforms: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  performance: {
    minEngagement: number
    maxEngagement: number
    minReach: number
    maxReach: number
  }
  status: string[]
  budget: {
    min: number | null
    max: number | null
  }
  contentType: string[]
}

interface AdvancedFilterProps {
  data: any[]
  onFilter: (filteredData: any[]) => void
  onFilterChange: (filters: FilterConfig) => void
}

const platformOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" }
]

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
  { value: "draft", label: "Draft" }
]

const contentTypeOptions = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "text", label: "Text" },
  { value: "carousel", label: "Carousel" },
  { value: "story", label: "Story" }
]

export function AdvancedFilter({ data, onFilter, onFilterChange }: AdvancedFilterProps) {
  const [filters, setFilters] = useState<FilterConfig>({
    platforms: [],
    dateRange: { start: null, end: null },
    performance: { minEngagement: 0, maxEngagement: 100, minReach: 0, maxReach: 1000000 },
    status: [],
    budget: { min: null, max: null },
    contentType: []
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const applyFilters = () => {
    let filtered = data

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      filtered = filtered.filter(item => 
        filters.platforms.includes(item.platform)
      )
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date || item.createdAt)
        const startDate = new Date(filters.dateRange.start!)
        const endDate = new Date(filters.dateRange.end!)
        return itemDate >= startDate && itemDate <= endDate
      })
    }

    // Performance filter
    filtered = filtered.filter(item => {
      const engagement = item.engagement || 0
      const reach = item.reach || 0
      
      return engagement >= filters.performance.minEngagement &&
             engagement <= filters.performance.maxEngagement &&
             reach >= filters.performance.minReach &&
             reach <= filters.performance.maxReach
    })

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(item => 
        filters.status.includes(item.status)
      )
    }

    // Budget filter
    if (filters.budget.min !== null || filters.budget.max !== null) {
      filtered = filtered.filter(item => {
        const budget = item.budget || 0
        return (filters.budget.min === null || budget >= filters.budget.min) &&
               (filters.budget.max === null || budget <= filters.budget.max)
      })
    }

    // Content type filter
    if (filters.contentType.length > 0) {
      filtered = filtered.filter(item => 
        filters.contentType.includes(item.contentType)
      )
    }

    onFilter(filtered)
    onFilterChange(filters)
  }

  const clearFilters = () => {
    setFilters({
      platforms: [],
      dateRange: { start: null, end: null },
      performance: { minEngagement: 0, maxEngagement: 100, minReach: 0, maxReach: 1000000 },
      status: [],
      budget: { min: null, max: null },
      contentType: []
    })
    setSearchTerm("")
    onFilter(data)
  }

  const addPlatformFilter = (platform: string) => {
    if (!filters.platforms.includes(platform)) {
      setFilters(prev => ({
        ...prev,
        platforms: [...prev.platforms, platform]
      }))
    }
  }

  const removePlatformFilter = (platform: string) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.filter(p => p !== platform)
    }))
  }

  const addStatusFilter = (status: string) => {
    if (!filters.status.includes(status)) {
      setFilters(prev => ({
        ...prev,
        status: [...prev.status, status]
      }))
    }
  }

  const removeStatusFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.filter(s => s !== status)
    }))
  }

  const addContentTypeFilter = (contentType: string) => {
    if (!filters.contentType.includes(contentType)) {
      setFilters(prev => ({
        ...prev,
        contentType: [...prev.contentType, contentType]
      }))
    }
  }

  const removeContentTypeFilter = (contentType: string) => {
    setFilters(prev => ({
      ...prev,
      contentType: prev.contentType.filter(c => c !== contentType)
    }))
  }

  React.useEffect(() => {
    applyFilters()
  }, [filters, searchTerm, data])

  const activeFiltersCount = [
    filters.platforms.length,
    filters.status.length,
    filters.contentType.length,
    filters.dateRange.start ? 1 : 0,
    filters.budget.min !== null || filters.budget.max !== null ? 1 : 0
  ].reduce((sum, count) => sum + count, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filters
            </CardTitle>
            <CardDescription>
              Filter your data with advanced criteria
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">
                {activeFiltersCount} active
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, platforms, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {isExpanded && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Platform Filters */}
            <div>
              <Label className="text-sm font-medium mb-2">Platforms</Label>
              <Select onValueChange={addPlatformFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Add platform filter" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions
                    .filter(option => !filters.platforms.includes(option.value))
                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-xs">
                    {platformOptions.find(p => p.value === platform)?.label}
                    <button
                      onClick={() => removePlatformFilter(platform)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Status Filters */}
            <div>
              <Label className="text-sm font-medium mb-2">Status</Label>
              <Select onValueChange={addStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Add status filter" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions
                    .filter(option => !filters.status.includes(option.value))
                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.status.map((status) => (
                  <Badge key={status} variant="secondary" className="text-xs">
                    {statusOptions.find(s => s.value === status)?.label}
                    <button
                      onClick={() => removeStatusFilter(status)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Content Type Filters */}
            <div>
              <Label className="text-sm font-medium mb-2">Content Type</Label>
              <Select onValueChange={addContentTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Add content type filter" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypeOptions
                    .filter(option => !filters.contentType.includes(option.value))
                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.contentType.map((contentType) => (
                  <Badge key={contentType} variant="secondary" className="text-xs">
                    {contentTypeOptions.find(c => c.value === contentType)?.label}
                    <button
                      onClick={() => removeContentTypeFilter(contentType)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <Label className="text-sm font-medium mb-2">Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startDate" className="text-xs">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={filters.dateRange.start || ""}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-xs">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={filters.dateRange.end || ""}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Performance Range */}
            <div>
              <Label className="text-sm font-medium mb-2">Performance Range</Label>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="minEngagement" className="text-xs">Min Engagement (%)</Label>
                  <Input
                    id="minEngagement"
                    type="number"
                    min="0"
                    max="100"
                    value={filters.performance.minEngagement}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      performance: { ...prev.performance, minEngagement: Number(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxEngagement" className="text-xs">Max Engagement (%)</Label>
                  <Input
                    id="maxEngagement"
                    type="number"
                    min="0"
                    max="100"
                    value={filters.performance.maxEngagement}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      performance: { ...prev.performance, maxEngagement: Number(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <Label className="text-sm font-medium mb-2">Budget Range</Label>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="minBudget" className="text-xs">Min Budget ($)</Label>
                  <Input
                    id="minBudget"
                    type="number"
                    min="0"
                    value={filters.budget.min || ""}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      budget: { ...prev.budget, min: e.target.value ? Number(e.target.value) : null }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxBudget" className="text-xs">Max Budget ($)</Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    min="0"
                    value={filters.budget.max || ""}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      budget: { ...prev.budget, max: e.target.value ? Number(e.target.value) : null }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilters(prev => ({
                ...prev,
                platforms: ["facebook", "instagram", "tiktok"]
              }))
            }}
          >
            <Users className="h-4 w-4 mr-1" />
            Top Platforms
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilters(prev => ({
                ...prev,
                status: ["active"]
              }))
            }}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Active Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date()
              const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
              setFilters(prev => ({
                ...prev,
                dateRange: {
                  start: lastMonth.toISOString().split('T')[0],
                  end: today.toISOString().split('T')[0]
                }
              }))
            }}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Last Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilters(prev => ({
                ...prev,
                performance: { minEngagement: 10, maxEngagement: 100, minReach: 0, maxReach: 1000000 }
              }))
            }}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            High Performance
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}