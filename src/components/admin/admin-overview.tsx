"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileVideo,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Clock,
  BarChart3,
} from "lucide-react"

const stats = [
  {
    title: "Total Athletes",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Video Submissions",
    value: "15,432",
    change: "+8%",
    trend: "up",
    icon: FileVideo,
    color: "text-secondary",
  },
  {
    title: "Verified Submissions",
    value: "14,891",
    change: "+5%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Pending Review",
    value: "541",
    change: "-15%",
    trend: "down",
    icon: Clock,
    color: "text-yellow-600",
  },
]

const recentActivity = [
  {
    type: "verification",
    message: "125 new submissions verified",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    type: "flag",
    message: "3 submissions flagged for review",
    time: "4 hours ago",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    type: "athlete",
    message: "47 new athletes registered",
    time: "6 hours ago",
    icon: Users,
    color: "text-blue-600",
  },
  {
    type: "analysis",
    message: "AI analysis completed for 89 videos",
    time: "8 hours ago",
    icon: Activity,
    color: "text-purple-600",
  },
]

const topRegions = [
  { name: "Delhi", athletes: 487, submissions: 2341, percentage: 85 },
  { name: "Mumbai", athletes: 423, submissions: 2156, percentage: 78 },
  { name: "Bangalore", athletes: 356, submissions: 1789, percentage: 82 },
  { name: "Chennai", athletes: 298, submissions: 1456, percentage: 76 },
  { name: "Hyderabad", athletes: 267, submissions: 1234, percentage: 80 },
]

export function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <TrendIcon className={`w-3 h-3 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                      <span className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-muted/50 ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Top Performing Regions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Top Performing Regions
            </CardTitle>
            <CardDescription>Regional performance and participation metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topRegions.map((region, index) => (
              <div key={region.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{region.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{region.athletes} athletes</p>
                    <p className="text-xs text-muted-foreground">{region.submissions} submissions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={region.percentage} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-10">{region.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">Review Flagged</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Bulk Verify</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <FileVideo className="w-5 h-5" />
              <span className="text-sm">Export Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
