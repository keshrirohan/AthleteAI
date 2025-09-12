"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, X, AlertTriangle, Play, Flag, Eye } from "lucide-react"
import { Image } from "@radix-ui/react-avatar"
const pendingSubmissions = [
  {
    id: "SUB001",
    athlete: {
      name: "Rajesh Kumar",
      id: "ATH001",
      avatar: "/athlete-1.png",
    },
    exercise: "Push-ups",
    uploadTime: "2 hours ago",
    duration: "2:34",
    aiScore: 8.7,
    flags: ["partial_range_detected"],
    priority: "medium",
    thumbnail: "/pushup-exercise.png",
  },
  {
    id: "SUB002",
    athlete: {
      name: "Arjun Singh",
      id: "ATH003",
      avatar: "/athlete-3.png",
    },
    exercise: "Squats",
    uploadTime: "4 hours ago",
    duration: "3:12",
    aiScore: 6.2,
    flags: ["inconsistent_form", "possible_assistance"],
    priority: "high",
    thumbnail: "/squat-exercise.png",
  },
  {
    id: "SUB003",
    athlete: {
      name: "Priya Sharma",
      id: "ATH002",
      avatar: "/athlete-2.png",
    },
    exercise: "Running",
    uploadTime: "6 hours ago",
    duration: "1:45",
    aiScore: 9.1,
    flags: ["lighting_issues"],
    priority: "low",
    thumbnail: "/running-sprint.png",
  },
]

export function VerificationQueue() {
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([])

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const handleVerify = (submissionId: string) => {
    console.log("Verifying submission:", submissionId)
    // Handle verification logic
  }

  const handleReject = (submissionId: string) => {
    console.log("Rejecting submission:", submissionId)
    // Handle rejection logic
  }

  const handleBulkAction = (action: "verify" | "reject") => {
    console.log(`Bulk ${action}:`, selectedSubmissions)
    // Handle bulk action logic
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-primary" />
          Verification Queue
        </CardTitle>
        <CardDescription>Review and verify athlete submissions flagged by AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Bulk Actions */}
        {selectedSubmissions.length > 0 && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">{selectedSubmissions.length} submission(s) selected</span>
            <Button size="sm" onClick={() => handleBulkAction("verify")}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Verify All
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleBulkAction("reject")}>
              <X className="w-4 h-4 mr-1" />
              Reject All
            </Button>
          </div>
        )}

        {/* Submissions Table */}
        <div className="space-y-4">
          {pendingSubmissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    className="mt-2"
                    checked={selectedSubmissions.includes(submission.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSubmissions([...selectedSubmissions, submission.id])
                      } else {
                        setSelectedSubmissions(selectedSubmissions.filter((id) => id !== submission.id))
                      }
                    }}
                  />

                  {/* Video Thumbnail */}
                  <div className="relative w-24 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={submission.thumbnail || "/placeholder.svg"}
                      alt={submission.exercise}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {submission.duration}
                    </div>
                  </div>

                  {/* Submission Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{submission.exercise}</h4>
                          {getPriorityBadge(submission.priority)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Avatar className="h-5 w-5">
                            <AvatarImage
                              src={submission.athlete.avatar || "/placeholder.svg"}
                              alt={submission.athlete.name}
                            />
                            <AvatarFallback className="text-xs">
                              {submission.athlete.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{submission.athlete.name}</span>
                          <span>•</span>
                          <span>{submission.athlete.id}</span>
                          <span>•</span>
                          <span>{submission.uploadTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm font-medium">AI Score:</span>
                          <span className="font-bold">{submission.aiScore}</span>
                        </div>
                      </div>
                    </div>

                    {/* Flags */}
                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-muted-foreground">Detected Issues:</p>
                      <div className="flex flex-wrap gap-2">
                        {submission.flags.map((flag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {flag.replace(/_/g, " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" onClick={() => handleVerify(submission.id)}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verify
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(submission.id)}>
                        <X className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Queue Stats */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">23</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">67</p>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-muted-foreground">Low Priority</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
