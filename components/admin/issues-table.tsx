"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useIssues } from "@/lib/issue-context"
import type { IssueStatus, IssuePriority, Department } from "@/lib/types"
import { Search, Filter, Eye } from "lucide-react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const statusColors = {
  submitted: "bg-blue-100 text-blue-800",
  "under-review": "bg-yellow-100 text-yellow-800",
  assigned: "bg-purple-100 text-purple-800",
  "in-progress": "bg-orange-100 text-orange-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
}

export function IssuesTable() {
  const { issues, updateIssue, addStatusUpdate } = useIssues()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || issue.id.includes(searchTerm)
    const matchesCategory = filterCategory === "all" || issue.category === filterCategory
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus
    const matchesPriority = filterPriority === "all" || issue.priority === filterPriority

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  const handleUpdateStatus = (issueId: string, newStatus: IssueStatus, message: string) => {
    updateIssue(issueId, { status: newStatus })
    addStatusUpdate({
      issueId,
      status: newStatus,
      message,
      updatedBy: "Admin",
    })
  }

  const handleAssign = (issueId: string, department: Department, assignedTo: string) => {
    updateIssue(issueId, {
      department,
      assignedTo,
      status: "assigned",
    })
    addStatusUpdate({
      issueId,
      status: "assigned",
      message: `Assigned to ${assignedTo} in ${department} department`,
      updatedBy: "Admin",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Reports</CardTitle>
        <CardDescription>Manage and track all civic issue reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="pothole">Pothole</SelectItem>
              <SelectItem value="streetlight">Street Light</SelectItem>
              <SelectItem value="garbage">Garbage</SelectItem>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="drainage">Drainage</SelectItem>
              <SelectItem value="road">Road</SelectItem>
              <SelectItem value="park">Park</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredIssues.length} of {issues.length} reports
        </div>

        {/* Issues list */}
        <div className="space-y-3">
          {filteredIssues.map((issue) => (
            <Card key={issue.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{issue.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          #{issue.id}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedIssue(issue.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Manage Issue #{issue.id}</DialogTitle>
                          <DialogDescription>{issue.title}</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Issue Details</h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Category:</strong> {issue.category}
                              </p>
                              <p>
                                <strong>Location:</strong> {issue.location.address}
                              </p>
                              <p>
                                <strong>Reported by:</strong> {issue.citizenName}
                              </p>
                              <p>
                                <strong>Contact:</strong> {issue.citizenPhone} | {issue.citizenEmail}
                              </p>
                              <p>
                                <strong>Reported on:</strong> {format(issue.createdAt, "PPP")}
                              </p>
                            </div>
                          </div>

                          {issue.photos && issue.photos.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">Photos</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {issue.photos.map((photo, idx) => (
                                  <img
                                    key={idx}
                                    src={photo || "/placeholder.svg"}
                                    alt={`Issue photo ${idx + 1}`}
                                    className="rounded-lg object-cover w-full h-40"
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Update Status</Label>
                            <Select
                              value={issue.status}
                              onValueChange={(value) => {
                                handleUpdateStatus(issue.id, value as IssueStatus, `Status updated to ${value}`)
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="submitted">Submitted</SelectItem>
                                <SelectItem value="under-review">Under Review</SelectItem>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Assign Department</Label>
                            <Select
                              value={issue.department || ""}
                              onValueChange={(value) => {
                                handleAssign(issue.id, value as Department, "Department Officer")
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public-works">Public Works</SelectItem>
                                <SelectItem value="sanitation">Sanitation</SelectItem>
                                <SelectItem value="water-supply">Water Supply</SelectItem>
                                <SelectItem value="electricity">Electricity</SelectItem>
                                <SelectItem value="parks">Parks & Recreation</SelectItem>
                                <SelectItem value="roads">Roads & Transport</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Priority Level</Label>
                            <Select
                              value={issue.priority}
                              onValueChange={(value) => {
                                updateIssue(issue.id, { priority: value as IssuePriority })
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Admin Notes</Label>
                            <Textarea
                              placeholder="Add internal notes..."
                              value={issue.adminNotes || ""}
                              onChange={(e) => updateIssue(issue.id, { adminNotes: e.target.value })}
                              rows={3}
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={statusColors[issue.status]}>{issue.status.replace("-", " ")}</Badge>
                    <Badge className={priorityColors[issue.priority]}>{issue.priority}</Badge>
                    <Badge variant="outline">{issue.category}</Badge>
                    {issue.department && <Badge variant="outline">{issue.department}</Badge>}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{format(issue.createdAt, "MMM dd, yyyy")}</span>
                    <span>•</span>
                    <span>{issue.location.address}</span>
                    {issue.assignedTo && (
                      <>
                        <span>•</span>
                        <span>Assigned to {issue.assignedTo}</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredIssues.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No reports found matching your filters
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
