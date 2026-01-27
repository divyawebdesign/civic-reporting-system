export type IssueCategory = "pothole" | "streetlight" | "garbage" | "water" | "drainage" | "road" | "park" | "other"

export type IssueStatus = "submitted" | "under-review" | "assigned" | "in-progress" | "resolved" | "closed"

export type IssuePriority = "low" | "medium" | "high" | "critical"

export type Department = "public-works" | "sanitation" | "water-supply" | "electricity" | "parks" | "roads"

export interface Location {
  lat: number
  lng: number
  address: string
}

export interface Issue {
  id: string
  title: string
  description: string
  category: IssueCategory
  status: IssueStatus
  priority: IssuePriority
  location: Location
  photos: string[]
  voiceNote?: string
  citizenName: string
  citizenPhone: string
  citizenEmail: string
  department?: Department
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  adminNotes?: string
}

export interface StatusUpdate {
  id: string
  issueId: string
  status: IssueStatus
  message: string
  updatedBy: string
  timestamp: Date
}
