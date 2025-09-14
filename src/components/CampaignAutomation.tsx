"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  BarChart3
} from "lucide-react"

interface AutomationRule {
  id: string
  name: string
  description: string
  condition: string
  action: string
  isActive: boolean
  triggerCount: number
  lastTriggered: string
  category: 'budget' | 'performance' | 'content' | 'scheduling'
}

interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  isActive: boolean
  executionCount: number
  lastExecuted: string
}

interface WorkflowStep {
  id: string
  type: 'trigger' | 'condition' | 'action'
  name: string
  config: Record<string, any>
}

const mockRules: AutomationRule[] = [
  {
    id: "1",
    name: "High Engagement Boost",
    description: "Increase budget when engagement exceeds 15%",
    condition: "engagement > 15%",
    action: "increase_budget_20%",
    isActive: true,
    triggerCount: 12,
    lastTriggered: "2 hours ago",
    category: "performance"
  },
  {
    id: "2",
    name: "Low Performance Alert",
    description: "Send alert when engagement drops below 5%",
    condition: "engagement < 5%",
    action: "send_alert",
    isActive: true,
    triggerCount: 3,
    lastTriggered: "1 day ago",
    category: "performance"
  },
  {
    id: "3",
    name: "Budget Limit Protection",
    description: "Pause campaign when 90% of budget is spent",
    condition: "budget_spent > 90%",
    action: "pause_campaign",
    isActive: true,
    triggerCount: 0,
    lastTriggered: "Never",
    category: "budget"
  },
  {
    id: "4",
    name: "Weekend Performance Boost",
    description: "Increase posting frequency on weekends",
    condition: "day = saturday OR day = sunday",
    action: "increase_posting_frequency_2x",
    isActive: false,
    triggerCount: 0,
    lastTriggered: "Never",
    category: "scheduling"
  }
]

const mockWorkflows: Workflow[] = [
  {
    id: "1",
    name: "Campaign Launch Sequence",
    description: "Automated campaign launch with progressive budget allocation",
    steps: [
      {
        id: "1",
        type: "trigger",
        name: "Campaign Start Date",
        config: { trigger: "date", value: "campaign_start_date" }
      },
      {
        id: "2",
        type: "condition",
        name: "Check Initial Performance",
        config: { metric: "engagement", operator: ">", value: "10%" }
      },
      {
        id: "3",
        type: "action",
        name: "Allocate Additional Budget",
        config: { action: "increase_budget", percentage: "25%" }
      }
    ],
    isActive: true,
    executionCount: 5,
    lastExecuted: "3 days ago"
  },
  {
    id: "2",
    name: "Content Optimization Workflow",
    description: "Automatically optimize content based on performance",
    steps: [
      {
        id: "1",
        type: "trigger",
        name: "Post Performance Check",
        config: { trigger: "post_published", delay: "24h" }
      },
      {
        id: "2",
        type: "condition",
        name: "Performance Threshold",
        config: { metric: "engagement", operator: "<", value: "8%" }
      },
      {
        id: "3",
        type: "action",
        name: "Generate Optimized Content",
        config: { action: "ai_content_optimization", platform: "all" }
      }
    ],
    isActive: true,
    executionCount: 23,
    lastExecuted: "1 hour ago"
  }
]

const conditionOptions = [
  { value: "engagement > 15%", label: "Engagement above 15%" },
  { value: "engagement < 5%", label: "Engagement below 5%" },
  { value: "reach > 100000", label: "Reach above 100K" },
  { value: "budget_spent > 90%", label: "Budget spent above 90%" },
  { value: "ctr < 2%", label: "Click-through rate below 2%" },
  { value: "sentiment < 0.5", label: "Sentiment below 0.5" }
]

const actionOptions = [
  { value: "increase_budget_20%", label: "Increase budget by 20%" },
  { value: "send_alert", label: "Send alert notification" },
  { value: "pause_campaign", label: "Pause campaign" },
  { value: "increase_posting_frequency_2x", label: "Double posting frequency" },
  { value: "optimize_content", label: "Optimize content" },
  { value: "boost_high_performers", label: "Boost high-performing posts" }
]

export function CampaignAutomation() {
  const [rules, setRules] = useState<AutomationRule[]>(mockRules)
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows)
  const [isCreatingRule, setIsCreatingRule] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    condition: "",
    action: "",
    category: "performance" as const
  })

  const handleToggleRule = (ruleId: string, isActive: boolean) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive } : rule
    ))
  }

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.condition || !newRule.action) return

    const rule: AutomationRule = {
      id: Date.now().toString(),
      name: newRule.name,
      description: newRule.description,
      condition: newRule.condition,
      action: newRule.action,
      isActive: true,
      triggerCount: 0,
      lastTriggered: "Never",
      category: newRule.category
    }

    setRules([rule, ...rules])
    setNewRule({
      name: "",
      description: "",
      condition: "",
      action: "",
      category: "performance"
    })
    setIsCreatingRule(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "budget": return <DollarSign className="h-4 w-4" />
      case "performance": return <BarChart3 className="h-4 w-4" />
      case "content": return <Target className="h-4 w-4" />
      case "scheduling": return <Calendar className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "budget": return "bg-green-100 text-green-800"
      case "performance": return "bg-blue-100 text-blue-800"
      case "content": return "bg-purple-100 text-purple-800"
      case "scheduling": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const activeRules = rules.filter(rule => rule.isActive)
  const totalTriggers = rules.reduce((sum, rule) => sum + rule.triggerCount, 0)

  return (
    <div className="space-y-6">
      {/* Automation Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Zap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRules.length}</div>
            <p className="text-xs text-muted-foreground">Out of {rules.length} total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Triggers</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTriggers}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length}</div>
            <p className="text-xs text-muted-foreground">Automated sequences</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Automation success rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Automation Rules</h2>
              <p className="text-muted-foreground">Manage your automated campaign rules</p>
            </div>
            <Button onClick={() => setIsCreatingRule(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Rule
            </Button>
          </div>

          {/* Create Rule Form */}
          {isCreatingRule && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Automation Rule</CardTitle>
                <CardDescription>Set up conditional automation for your campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="ruleName">Rule Name</Label>
                    <Input
                      id="ruleName"
                      value={newRule.name}
                      onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter rule name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ruleCategory">Category</Label>
                    <Select value={newRule.category} onValueChange={(value) => setNewRule(prev => ({ ...prev, category: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="scheduling">Scheduling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="ruleDescription">Description</Label>
                  <Textarea
                    id="ruleDescription"
                    value={newRule.description}
                    onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this rule does"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={newRule.condition} onValueChange={(value) => setNewRule(prev => ({ ...prev, condition: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="action">Action</Label>
                    <Select value={newRule.action} onValueChange={(value) => setNewRule(prev => ({ ...prev, action: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {actionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreatingRule(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRule}>
                    Create Rule
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rules List */}
          <div className="space-y-4">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(rule.category)}
                        <CardTitle className="text-lg">{rule.name}</CardTitle>
                      </div>
                      <Badge className={getCategoryColor(rule.category)}>
                        {rule.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={(checked) => handleToggleRule(rule.id, checked)}
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{rule.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <span className="text-sm font-medium">Condition</span>
                      <p className="text-sm text-muted-foreground">{rule.condition}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Action</span>
                      <p className="text-sm text-muted-foreground">{rule.action}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Activity</span>
                      <p className="text-sm text-muted-foreground">
                        {rule.triggerCount} triggers • Last: {rule.lastTriggered}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Automated Workflows</h2>
              <p className="text-muted-foreground">Multi-step automation sequences</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <Badge variant={workflow.isActive ? "default" : "secondary"}>
                      {workflow.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium">Steps</span>
                      <div className="mt-2 space-y-2">
                        {workflow.steps.map((step, index) => (
                          <div key={step.id} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">{index + 1}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{step.name}</p>
                              <p className="text-xs text-muted-foreground">{step.type}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-sm text-muted-foreground">
                        {workflow.executionCount} executions
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last: {workflow.lastExecuted}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>Recent automation rule executions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rule: "High Engagement Boost", status: "success", timestamp: "2 hours ago", result: "Budget increased by 20%" },
                  { rule: "Content Optimization Workflow", status: "success", timestamp: "3 hours ago", result: "Content optimized for all platforms" },
                  { rule: "Low Performance Alert", status: "warning", timestamp: "1 day ago", result: "Alert sent to admin" },
                  { rule: "Budget Limit Protection", status: "info", timestamp: "2 days ago", result: "No action needed" }
                ].map((execution, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        execution.status === "success" ? "bg-green-500" :
                        execution.status === "warning" ? "bg-yellow-500" : "bg-blue-500"
                      }`}></div>
                      <div>
                        <p className="font-medium">{execution.rule}</p>
                        <p className="text-sm text-muted-foreground">{execution.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{execution.result}</p>
                      <Badge variant={
                        execution.status === "success" ? "default" :
                        execution.status === "warning" ? "secondary" : "outline"
                      }>
                        {execution.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
              <CardDescription>Configure global automation preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">General Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Automation</p>
                        <p className="text-sm text-muted-foreground">Allow automated rule execution</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Send email alerts for automation events</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Real-time Monitoring</p>
                        <p className="text-sm text-muted-foreground">Monitor campaigns in real-time</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Performance Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">High Frequency Mode</p>
                        <p className="text-sm text-muted-foreground">Execute rules every 5 minutes</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Conservative Mode</p>
                        <p className="text-sm text-muted-foreground">Require higher confidence for actions</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Safety Limits</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="maxBudgetIncrease">Maximum Budget Increase (%)</Label>
                      <Input id="maxBudgetIncrease" type="number" defaultValue="50" className="w-32" />
                    </div>
                    <div>
                      <Label htmlFor="maxDailyTriggers">Maximum Daily Triggers per Rule</Label>
                      <Input id="maxDailyTriggers" type="number" defaultValue="10" className="w-32" />
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