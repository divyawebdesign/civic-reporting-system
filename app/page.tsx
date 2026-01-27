"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportForm } from "@/components/citizen/report-form"
import { IssueTracker } from "@/components/citizen/issue-tracker"
import { MapPin, FileText } from "lucide-react"

export default function CitizenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Civic Issue Reporting</h1>
          <p className="text-lg text-muted-foreground">Government of Jharkhand - Clean & Green Initiative</p>
        </div>

        <Tabs defaultValue="report" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="report" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Report Issue
            </TabsTrigger>
            <TabsTrigger value="track" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Track Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report">
            <ReportForm />
          </TabsContent>

          <TabsContent value="track">
            <IssueTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
