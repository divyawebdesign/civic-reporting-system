import type { Issue } from "../types"

export function calculateAnalytics(issues: Issue[]) {
  const total = issues.length
  const resolved = issues.filter((i) => i.status === "resolved" || i.status === "closed").length
  const inProgress = issues.filter((i) => i.status === "in-progress").length
  const pending = issues.filter((i) => i.status === "submitted" || i.status === "under-review").length

  // Calculate average resolution time
  const resolvedIssues = issues.filter((i) => i.resolvedAt)
  const avgResolutionTime =
    resolvedIssues.length > 0
      ? resolvedIssues.reduce((acc, issue) => {
          const time = issue.resolvedAt!.getTime() - issue.createdAt.getTime()
          return acc + time
        }, 0) /
        resolvedIssues.length /
        (1000 * 60 * 60 * 24) // Convert to days
      : 0

  // Category breakdown
  const categoryBreakdown = issues.reduce(
    (acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Priority breakdown
  const priorityBreakdown = issues.reduce(
    (acc, issue) => {
      acc[issue.priority] = (acc[issue.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Department workload
  const departmentWorkload = issues.reduce(
    (acc, issue) => {
      if (issue.department) {
        acc[issue.department] = (acc[issue.department] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total,
    resolved,
    inProgress,
    pending,
    resolutionRate: total > 0 ? (resolved / total) * 100 : 0,
    avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
    categoryBreakdown,
    priorityBreakdown,
    departmentWorkload,
  }
}
