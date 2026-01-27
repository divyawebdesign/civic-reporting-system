"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useIssues } from "@/lib/issue-context"
import { Search, MapPin, Calendar, User } from "lucide-react"
import { format } from "date-fns"

const statusColors: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  "under-review": "bg-yellow-100 text-yellow-800",
  assigned: "bg-purple-100 text-purple-800",
  "in-progress": "bg-orange-100 text-orange-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
}

export function IssueTracker() {
  const { issues } = useIssues()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      {/* SEARCH CARD */}
      <Card>
        <CardHeader>
          <CardTitle>Track Your Reports</CardTitle>
          <CardDescription>Search by report ID or issue title</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* RESULTS LIST */}
      <div className="space-y-3">
        {filteredIssues.map((issue) => (
          <Card key={issue.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                
                {/* TITLE + STATUS */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Report ID: #{issue.id}
                    </p>
                  </div>

                  <Badge className={statusColors[issue.status]}>
                    {issue.status.replace("-", " ")}
                  </Badge>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm">{issue.description}</p>

                {/* LOCATION • DATE • ASSIGNED */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{issue.location.address}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(issue.createdAt, "MMM dd, yyyy")}</span>
                  </div>

                  {issue.assignedTo && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Assigned to {issue.assignedTo}</span>
                    </div>
                  )}
                </div>

                {/* PHOTOS */}
                {issue.photos && issue.photos.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {issue.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo || "/placeholder.svg"}
                        alt={`Issue photo ${idx + 1}`}
                        className="h-20 w-20 rounded object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* EMPTY STATE */}
        {filteredIssues.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No reports found
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
