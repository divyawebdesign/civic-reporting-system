import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { IssueProvider } from "@/lib/issue-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Civic Issue Reporting System - Government of Jharkhand",
  description: "Report and track civic issues in your community",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <IssueProvider>{children}</IssueProvider>
      </body>
    </html>
  )
}
