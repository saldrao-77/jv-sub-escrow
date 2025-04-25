"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Download, Search, ArrowUpDown, Save, X, Edit2, Trash2, Smartphone, Monitor } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

// Define the submission type
type Submission = {
  id: string | number
  name: string
  email: string
  company: string
  properties: string
  status: "pending" | "processed"
  submitted_at: string
  form_source: string
  notes: string
  device_type?: string
  isNew?: boolean
  url?: string
  user_agent?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [deviceFilter, setDeviceFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [editingNotes, setEditingNotes] = useState<string | number | null>(null)
  const [notesText, setNotesText] = useState("")
  const [newSubmissionsCount, setNewSubmissionsCount] = useState(0)
  const [lastFetchTime, setLastFetchTime] = useState(Date.now())
  const [error, setError] = useState<string | null>(null)

  // Load submissions from Supabase
  const fetchSubmissions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClientSupabaseClient()

      // Fetch submissions from Supabase
      const { data, error } = await supabase.from("jv_sub_e").select("*").order("submitted_at", { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        // Check for new submissions
        if (submissions.length > 0 && data.length > submissions.length) {
          setNewSubmissionsCount(data.length - submissions.length)

          // Mark new submissions
          const updatedSubmissions = data.map((sub: Submission, index: number) => {
            if (new Date(sub.submitted_at).getTime() > lastFetchTime) {
              return { ...sub, isNew: true }
            }
            return sub
          })

          setSubmissions(updatedSubmissions)
          setFilteredSubmissions(updatedSubmissions)
        } else {
          setSubmissions(data)
          setFilteredSubmissions(data)
        }

        setLastFetchTime(Date.now())
      }
    } catch (error) {
      console.error("Error loading submissions:", error)
      setError("Failed to load submissions. Please try again.")

      // Fallback to empty array
      setSubmissions([])
      setFilteredSubmissions([])
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchSubmissions()

    // Set up polling for new submissions every 30 seconds
    const interval = setInterval(() => {
      fetchSubmissions()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Filter submissions based on search, status, source, device, and date range
  useEffect(() => {
    let filtered = [...submissions]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (sub) =>
          (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (sub.email && sub.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (sub.company && sub.company.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((sub) => sub.status === statusFilter)
    }

    // Filter by source
    if (sourceFilter !== "all") {
      filtered = filtered.filter((sub) => sub.form_source === sourceFilter)
    }

    // Filter by device
    if (deviceFilter !== "all") {
      filtered = filtered.filter((sub) => {
        if (deviceFilter === "mobile") {
          return sub.device_type === "mobile"
        } else if (deviceFilter === "desktop") {
          return sub.device_type === "desktop"
        }
        return true
      })
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter((sub) => new Date(sub.submitted_at) >= new Date(startDate))
    }

    if (endDate) {
      filtered = filtered.filter((sub) => new Date(sub.submitted_at) <= new Date(endDate + "T23:59:59"))
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.submitted_at).getTime()
      const dateB = new Date(b.submitted_at).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredSubmissions(filtered)
  }, [submissions, searchTerm, statusFilter, sourceFilter, deviceFilter, startDate, endDate, sortOrder])

  // Handle refresh
  const handleRefresh = () => {
    fetchSubmissions()
    setNewSubmissionsCount(0)
  }

  // Handle export to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Company",
      "Properties",
      "Status",
      "Date",
      "Source",
      "Device",
      "Notes",
      "URL",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
    ]
    const csvData = filteredSubmissions.map((sub) => [
      sub.id,
      sub.name || "",
      sub.email || "",
      sub.company || "",
      sub.properties || "",
      sub.status || "",
      new Date(sub.submitted_at).toLocaleString(),
      sub.form_source || "",
      sub.device_type || "unknown",
      sub.notes || "",
      sub.url || "",
      sub.utm_source || "",
      sub.utm_medium || "",
      sub.utm_campaign || "",
    ])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `jobvault-leads-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  // Handle status change
  const handleStatusChange = async (id: string | number, newStatus: "pending" | "processed") => {
    try {
      const supabase = createClientSupabaseClient()

      // Update status in Supabase
      const { error } = await supabase.from("jv_sub_e").update({ status: newStatus }).eq("id", id)

      if (error) {
        throw error
      }

      // Update local state
      const updatedSubmissions = submissions.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))

      setSubmissions(updatedSubmissions)
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status. Please try again.")
    }
  }

  // Handle delete submission
  const handleDeleteSubmission = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        const supabase = createClientSupabaseClient()

        // Delete from Supabase
        const { error } = await supabase.from("jv_sub_e").delete().eq("id", id)

        if (error) {
          throw error
        }

        // Update local state
        const updatedSubmissions = submissions.filter((sub) => sub.id !== id)
        setSubmissions(updatedSubmissions)
      } catch (error) {
        console.error("Error deleting submission:", error)
        alert("Failed to delete submission. Please try again.")
      }
    }
  }

  // Start editing notes
  const startEditingNotes = (id: string | number, currentNotes: string) => {
    setEditingNotes(id)
    setNotesText(currentNotes || "")
  }

  // Save notes
  const saveNotes = async (id: string | number) => {
    try {
      const supabase = createClientSupabaseClient()

      // Update notes in Supabase
      const { error } = await supabase.from("jv_sub_e").update({ notes: notesText }).eq("id", id)

      if (error) {
        throw error
      }

      // Update local state
      const updatedSubmissions = submissions.map((sub) => (sub.id === id ? { ...sub, notes: notesText } : sub))

      setSubmissions(updatedSubmissions)
      setEditingNotes(null)
    } catch (error) {
      console.error("Error updating notes:", error)
      alert("Failed to update notes. Please try again.")
    }
  }

  // Cancel editing notes
  const cancelEditingNotes = () => {
    setEditingNotes(null)
    setNotesText("")
  }

  // Count submissions by status and device
  const totalCount = submissions.length
  const pendingCount = submissions.filter((sub) => sub.status === "pending").length
  const processedCount = submissions.filter((sub) => sub.status === "processed").length
  const mobileCount = submissions.filter((sub) => sub.device_type === "mobile").length
  const desktopCount = submissions.filter((sub) => sub.device_type === "desktop").length

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading">Lead Submissions Dashboard</h1>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2" onClick={toggleSortOrder}>
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </Button>
            <Button variant="outline" className="flex items-center gap-2 relative" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              Refresh Data
              {newSubmissionsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {newSubmissionsCount}
                </span>
              )}
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportCSV}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-100 px-4 py-3 rounded mb-6">{error}</div>
        )}

        <div className="bg-zinc-900 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="search" className="block text-xs font-medium mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by name, email, company..."
                  className="pl-10 bg-zinc-800 border-zinc-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-xs font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
              </select>
            </div>

            <div>
              <label htmlFor="source" className="block text-xs font-medium mb-1">
                Source
              </label>
              <select
                id="source"
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <option value="all">All Sources</option>
                <option value="hero">Hero</option>
                <option value="get-started">Get Started</option>
                <option value="homepage">Homepage</option>
              </select>
            </div>

            <div>
              <label htmlFor="device" className="block text-xs font-medium mb-1">
                Device
              </label>
              <select
                id="device"
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={deviceFilter}
                onChange={(e) => setDeviceFilter(e.target.value)}
              >
                <option value="all">All Devices</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="startDate" className="block text-xs font-medium mb-1">
                Start Date
              </label>
              <Input
                id="startDate"
                type="date"
                className="bg-zinc-800 border-zinc-700"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-xs font-medium mb-1">
                End Date
              </label>
              <Input
                id="endDate"
                type="date"
                className="bg-zinc-800 border-zinc-700"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="text-sm">
              <span className="text-white/60">Total:</span> <span className="font-bold">{totalCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">Pending:</span>{" "}
              <span className="font-bold text-yellow-400">{pendingCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">Processed:</span>{" "}
              <span className="font-bold text-green-400">{processedCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">Mobile:</span>{" "}
              <span className="font-bold text-blue-400">{mobileCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">Desktop:</span>{" "}
              <span className="font-bold text-purple-400">{desktopCount}</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg overflow-hidden text-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={toggleSortOrder}>
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-white/60">Loading submissions...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-20 text-center text-white/60">
                      No submissions found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className={`hover:bg-zinc-800/50 ${submission.isNew ? "bg-blue-900/20" : ""}`}
                    >
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.name || "—"}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.email || "—"}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.company || "—"}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.properties || "—"}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <select
                          className="bg-zinc-800 border-zinc-700 rounded p-1 text-xs w-24"
                          value={submission.status}
                          onChange={(e) => handleStatusChange(submission.id, e.target.value as "pending" | "processed")}
                        >
                          <option value="pending">Pending</option>
                          <option value="processed">Processed</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        {new Date(submission.submitted_at).toLocaleDateString() +
                          " " +
                          new Date(submission.submitted_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-blue-900/20 text-blue-400">
                          {submission.form_source}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        {submission.device_type === "mobile" ? (
                          <span className="flex items-center gap-1 text-blue-400">
                            <Smartphone className="h-3 w-3" /> Mobile
                          </span>
                        ) : submission.device_type === "desktop" ? (
                          <span className="flex items-center gap-1 text-purple-400">
                            <Monitor className="h-3 w-3" /> Desktop
                          </span>
                        ) : (
                          <span className="text-white/40">Unknown</span>
                        )}
                      </td>
                      <td className="px-3 py-2 max-w-[200px]">
                        {editingNotes === submission.id ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              className="w-full h-16 bg-zinc-800 border-zinc-700 rounded p-1 text-xs"
                              value={notesText}
                              onChange={(e) => setNotesText(e.target.value)}
                              placeholder="Add notes here..."
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1 py-1 h-8"
                                onClick={() => saveNotes(submission.id)}
                              >
                                <Save className="h-3 w-3" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1 py-1 h-8"
                                onClick={cancelEditingNotes}
                              >
                                <X className="h-3 w-3" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="text-xs text-white/80 max-w-[180px] break-words">
                              {submission.notes || <span className="text-white/40 italic">No notes</span>}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => startEditingNotes(submission.id, submission.notes)}
                            >
                              <Edit2 className="h-3 w-3" />
                              <span className="sr-only">Edit Notes</span>
                            </Button>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => handleDeleteSubmission(submission.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
