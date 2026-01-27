"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useIssues } from "@/lib/issue-context"
import { calculateAnalytics } from "@/lib/utils/analytics"
import { AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react"

export function DashboardStats() {
  const { issues } = useIssues()
  const analytics = calculateAnalytics(issues)

  const stats = [
    {
      title: "Total Reports",
      value: analytics.total,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: analytics.pending,
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    {
      title: "In Progress",
      value: analytics.inProgress,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Resolved",
      value: analytics.resolved,
      icon: CheckCircle2,
      color: "text-green-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.title === "Resolved" && (
                <p className="text-xs text-muted-foreground mt-1">
                  {analytics.resolutionRate.toFixed(1)}% resolution rate
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
