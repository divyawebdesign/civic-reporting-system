"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Issue, StatusUpdate } from "./types"
import { mockIssues, mockStatusUpdates } from "./mock-data"

interface IssueContextType {
  issues: Issue[]
  statusUpdates: StatusUpdate[]
  addIssue: (issue: Omit<Issue, "id" | "createdAt" | "updatedAt">) => void
  updateIssue: (id: string, updates: Partial<Issue>) => void
  addStatusUpdate: (update: Omit<StatusUpdate, "id" | "timestamp">) => void
  getIssueById: (id: string) => Issue | undefined
  getStatusUpdatesByIssueId: (issueId: string) => StatusUpdate[]
}

const IssueContext = createContext<IssueContextType | undefined>(undefined)

export function IssueProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedIssues = localStorage.getItem("civic-issues")
    const savedUpdates = localStorage.getItem("civic-status-updates")

    if (savedIssues) {
      setIssues(
        JSON.parse(savedIssues, (key, value) => {
          if (key === "createdAt" || key === "updatedAt" || key === "resolvedAt") {
            return value ? new Date(value) : undefined
          }
          return value
        }),
      )
    } else {
      setIssues(mockIssues)
    }

    if (savedUpdates) {
      setStatusUpdates(
        JSON.parse(savedUpdates, (key, value) => {
          if (key === "timestamp") {
            return new Date(value)
          }
          return value
        }),
      )
    } else {
      setStatusUpdates(mockStatusUpdates)
    }
  }, [])

  // Save to localStorage whenever issues or updates change
  useEffect(() => {
    if (issues.length > 0) {
      localStorage.setItem("civic-issues", JSON.stringify(issues))
    }
  }, [issues])

  useEffect(() => {
    if (statusUpdates.length > 0) {
      localStorage.setItem("civic-status-updates", JSON.stringify(statusUpdates))
    }
  }, [statusUpdates])

  const addIssue = (issue: Omit<Issue, "id" | "createdAt" | "updatedAt">) => {
    const newIssue: Issue = {
      ...issue,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setIssues((prev) => [newIssue, ...prev])
  }

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, ...updates, updatedAt: new Date() } : issue)),
    )
  }

  const addStatusUpdate = (update: Omit<StatusUpdate, "id" | "timestamp">) => {
    const newUpdate: StatusUpdate = {
      ...update,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setStatusUpdates((prev) => [newUpdate, ...prev])
  }

  const getIssueById = (id: string) => {
    return issues.find((issue) => issue.id === id)
  }

  const getStatusUpdatesByIssueId = (issueId: string) => {
    return statusUpdates.filter((update) => update.issueId === issueId)
  }

  return (
    <IssueContext.Provider
      value={{
        issues,
        statusUpdates,
        addIssue,
        updateIssue,
        addStatusUpdate,
        getIssueById,
        getStatusUpdatesByIssueId,
      }}
    >
      {children}
    </IssueContext.Provider>
  )
}

export function useIssues() {
  const context = useContext(IssueContext)
  if (!context) {
    throw new Error("useIssues must be used within IssueProvider")
  }
  return context
}
