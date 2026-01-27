"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { IssuesMap } from "@/components/admin/issues-map"
import { IssuesTable } from "@/components/admin/issues-table"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { LayoutDashboard, Map, FileText, BarChart3 } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-green-800">Admin Dashboard - Civic Issue Management</h1>
          <p className="text-sm text-muted-foreground">Government of Jharkhand</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Issues
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
            <IssuesMap />
          </TabsContent>

          <TabsContent value="map">
            <IssuesMap />
          </TabsContent>

          <TabsContent value="issues">
            <IssuesTable />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
