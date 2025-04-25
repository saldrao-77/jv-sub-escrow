"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { ArrowUpDown, RefreshCw, Download, Search, Calendar, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [sourceFilter, setSourceFilter] = useState("All Sources")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Stats
  const [totalCount, setTotalCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [processedCount, setProcessedCount] = useState(0)

  // Fetch submissions from Supabase
  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const supabase = createClientSupabaseClient()
      const { data, error } = await supabase
        .from("jv_sub_e")
        .select("*")
        .order("created_at", { ascending: sortDirection === "asc" })

      if (error) {
        console.error("Supabase error:", error)
      } else {
        setSubmissions(data || [])

        // Calculate stats
        setTotalCount(data?.length || 0)

        const pending = data?.filter((item) => item.status === "Pending" || !item.status).length || 0
        setPendingCount(pending)

        const processed = data?.filter((item) => item.status === "Processed").length || 0
        setProcessedCount(processed)
      }
    } catch (err) {
      console.error("Failed to fetch submissions:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [sortDirection])

  // Filter submissions based on search query, status, source, and date range
  const filteredSubmissions = submissions.filter((submission) => {
    // Search filter
    const searchFields = [submission.name, submission.email, submission.company, submission.properties]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    const matchesSearch = searchQuery === "" || searchFields.includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus =
      statusFilter === "All Statuses" ||
      submission.status === statusFilter ||
      (statusFilter === "Pending" && !submission.status)

    // Source filter
    const matchesSource = sourceFilter === "All Sources" || submission.source === sourceFilter

    // Date filter
    let matchesDate = true
    if (startDate && endDate) {
      const submissionDate = new Date(submission.created_at)
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999) // Set to end of day
      matchesDate = submissionDate >= start && submissionDate <= end
    }

    return matchesSearch && matchesStatus && matchesSource && matchesDate
  })

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const supabase = createClientSupabaseClient()
      const { error } = await supabase.from("jv_sub_e").update({ status: newStatus }).eq("id", id)

      if (error) {
        console.error("Error updating status:", error)
      } else {
        // Update local state
        setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub)))

        // Update counts
        if (newStatus === "Processed") {
          setPendingCount((prev) => prev - 1)
          setProcessedCount((prev) => prev + 1)
        } else if (newStatus === "Pending") {
          setProcessedCount((prev) => prev - 1)
          setPendingCount((prev) => prev + 1)
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err)
    }
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    try {
      const supabase = createClientSupabaseClient()
      const { error } = await supabase.from("jv_sub_e").delete().eq("id", id)

      if (error) {
        console.error("Error deleting submission:", error)
      } else {
        // Update local state
        const deletedSubmission = submissions.find((sub) => sub.id === id)
        setSubmissions(submissions.filter((sub) => sub.id !== id))

        // Update counts
        setTotalCount((prev) => prev - 1)
        if (deletedSubmission?.status === "Processed") {
          setProcessedCount((prev) => prev - 1)
        } else {
          setPendingCount((prev) => prev - 1)
        }
      }
    } catch (err) {
      console.error("Failed to delete submission:", err)
    }
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Company", "Properties", "Status", "Date", "Form Source", "Table", "Notes"]

    const csvData = filteredSubmissions.map((sub) => [
      sub.name || "",
      sub.email || "",
      sub.company || "",
      sub.properties || "",
      sub.status || "Pending",
      new Date(sub.created_at).toLocaleString(),
      sub.source || "",
      "jv_sub_e",
      "",
    ])

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `jobvault-submissions-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header with logo */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%2B2024-02-06%2Bat%2B9.10.01%E2%80%AFPM_prev_ui-u8gmYbsyJFmS3MgH5m6ulUfzoQgiqp.png"
              alt="JobVault"
              width={150}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-white/80 hover:text-white">
                Home
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" className="text-white/80 hover:text-white">
                FAQ
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="text-white/80 hover:text-white">
                Pricing
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="text-white/80 hover:text-white">
                About Us
              </Button>
            </Link>
            <Link href="/get-started">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard header */}
        <h1 className="text-4xl font-bold mb-6">Lead Submissions Dashboard</h1>

        <div className="flex items-center mb-6">
          <div className="flex items-center space-x-2 text-white/70">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 4h16v16H4V4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Current Table:</span>
            <span className="bg-zinc-800 px-3 py-1 rounded-md">Property Management</span>
          </div>

          <div className="ml-auto flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={toggleSortDirection}>
              Newest First <ArrowUpDown className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="flex items-center gap-2" onClick={fetchSubmissions}>
              <RefreshCw className="h-4 w-4" /> Refresh Data
            </Button>

            <Button variant="outline" className="flex items-center gap-2" onClick={exportToCSV}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-zinc-900 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search by name, email, company..."
                  className="pl-10 bg-zinc-800 border-zinc-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processed">Processed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Form Source</label>
              <select
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <option value="All Sources">All Sources</option>
                <option value="hero">Hero</option>
                <option value="get-started">Get Started</option>
                <option value="homepage">Homepage</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    type="date"
                    className="pl-10 bg-zinc-800 border-zinc-700"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    type="date"
                    className="pl-10 bg-zinc-800 border-zinc-700"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="text-sm">
              <span className="text-white/70">Total:</span> <span className="font-bold">{totalCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/70">Pending:</span> <span className="font-bold">{pendingCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/70">Processed:</span> <span className="font-bold">{processedCount}</span>
            </div>
          </div>
        </div>

        {/* Submissions table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800 text-left">
                <tr>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Name</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Email</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Company</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Properties</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Status</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">
                    Date <ArrowUpDown className="inline h-3 w-3 ml-1" />
                  </th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Form Source</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Table</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Notes</th>
                  <th className="px-4 py-3 uppercase text-xs font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission, index) => (
                  <tr key={submission.id || index} className="border-t border-zinc-800">
                    <td className="px-4 py-3">{submission.name || "-"}</td>
                    <td className="px-4 py-3">{submission.email || "-"}</td>
                    <td className="px-4 py-3">{submission.company || "-"}</td>
                    <td className="px-4 py-3">{submission.properties || "-"}</td>
                    <td className="px-4 py-3">
                      <select
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
                        value={submission.status || "Pending"}
                        onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processed">Processed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">{new Date(submission.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs">
                        {submission.source || "homepage"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-blue-400">jv_pm</span>
                    </td>
                    <td className="px-4 py-3 text-white/60">No notes</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-white/70 hover:text-white" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-white/70 hover:text-red-400"
                          title="Delete"
                          onClick={() => handleDelete(submission.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-900 rounded-lg">
            <p>No submissions found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
