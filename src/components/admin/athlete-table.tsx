"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
/* Remove the Table import if it's not a simple wrapper, and use native table elements below */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Eye, MoreHorizontal, CheckCircle, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockAthletes = [
  {
    id: "ATH001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    region: "Delhi",
    gender: "Male",
    age: 22,
    sport: "Athletics",
    totalSubmissions: 15,
    avgScore: 8.7,
    lastActivity: "2 hours ago",
    status: "verified",
    avatar: "/athlete-1.png",
  },
  {
    id: "ATH002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    region: "Mumbai",
    gender: "Female",
    age: 19,
    sport: "Swimming",
    totalSubmissions: 23,
    avgScore: 9.1,
    lastActivity: "1 day ago",
    status: "verified",
    avatar: "/athlete-2.png",
  },
  {
    id: "ATH003",
    name: "Arjun Singh",
    email: "arjun.singh@email.com",
    region: "Punjab",
    gender: "Male",
    age: 24,
    sport: "Wrestling",
    totalSubmissions: 8,
    avgScore: 7.9,
    lastActivity: "3 days ago",
    status: "pending",
    avatar: "/athlete-3.png",
  },
  {
    id: "ATH004",
    name: "Sneha Patel",
    email: "sneha.patel@email.com",
    region: "Gujarat",
    gender: "Female",
    age: 21,
    sport: "Gymnastics",
    totalSubmissions: 31,
    avgScore: 8.9,
    lastActivity: "5 hours ago",
    status: "verified",
    avatar: "/athlete-4.png",
  },
  {
    id: "ATH005",
    name: "Vikram Reddy",
    email: "vikram.reddy@email.com",
    region: "Hyderabad",
    gender: "Male",
    age: 23,
    sport: "Badminton",
    totalSubmissions: 12,
    avgScore: 8.3,
    lastActivity: "1 week ago",
    status: "flagged",
    avatar: "/athlete-5.png",
  },
]

export function AthleteTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAthletes = mockAthletes.filter((athlete) => {
    const matchesSearch =
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRegion = regionFilter === "all" || athlete.region === regionFilter
    const matchesGender = genderFilter === "all" || athlete.gender === genderFilter
    const matchesStatus = statusFilter === "all" || athlete.status === statusFilter

    return matchesSearch && matchesRegion && matchesGender && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "flagged":
        return <Badge className="bg-red-100 text-red-800">Flagged</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle className="flex  items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Athlete Database
        </CardTitle>
        <CardDescription>Manage and monitor athlete profiles and performance data</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search athletes by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Punjab">Punjab</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Athlete</th>
                <th className="px-4 py-2 text-left">Region</th>
                <th className="px-4 py-2 text-left">Sport</th>
                <th className="px-4 py-2 text-center">Submissions</th>
                <th className="px-4 py-2 text-left">Avg Score</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Last Activity</th>
                <th className="px-4 py-2 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAthletes.map((athlete) => (
                <tr key={athlete.id} className="border-t">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={athlete.avatar || "/placeholder.svg"} alt={athlete.name} />
                        <AvatarFallback>
                          {athlete.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{athlete.name}</p>
                        <p className="text-sm text-muted-foreground">{athlete.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div>
                      <p className="font-medium">{athlete.region}</p>
                      <p className="text-sm text-muted-foreground">
                        {athlete.gender}, {athlete.age}y
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2">{athlete.sport}</td>
                  <td className="px-4 py-2 text-center">{athlete.totalSubmissions}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{athlete.avgScore}</span>
                      {athlete.avgScore >= 9 ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : athlete.avgScore < 8 ? (
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-2">{getStatusBadge(athlete.status)}</td>
                  <td className="px-4 py-2 text-sm text-muted-foreground">{athlete.lastActivity}</td>
                  <td className="px-4 py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Filter className="w-4 h-4 mr-2" />
                          View Submissions
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAthletes.length} of {mockAthletes.length} athletes
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
