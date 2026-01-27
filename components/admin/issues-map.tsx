"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useIssues } from "@/lib/issue-context"
import { MapPin } from "lucide-react"

const priorityColors = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
}

export function IssuesMap() {
  const { issues } = useIssues()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues Map</CardTitle>
        <CardDescription>Geographic distribution of reported issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden">
          {/* Simulated map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* Issue markers */}
          {issues.map((issue, idx) => {
            const x = 20 + (idx % 5) * 18
            const y = 20 + Math.floor(idx / 5) * 25

            return (
              <div key={issue.id} className="absolute group cursor-pointer" style={{ left: `${x}%`, top: `${y}%` }}>
                <div className={`h-3 w-3 rounded-full ${priorityColors[issue.priority]} animate-pulse`} />
                <MapPin
                  className={`h-6 w-6 -mt-6 -ml-1.5 ${issue.priority === "critical" ? "text-red-600" : issue.priority === "high" ? "text-orange-600" : "text-blue-600"}`}
                />

                {/* Tooltip */}
                <div className="absolute left-6 top-0 hidden group-hover:block z-10 w-64">
                  <div className="bg-white border rounded-lg shadow-lg p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm">{issue.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {issue.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{issue.location.address}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="text-xs">{issue.status}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {issue.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange-500" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span>Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
