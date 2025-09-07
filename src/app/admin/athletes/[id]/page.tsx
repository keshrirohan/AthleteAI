"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AthleteProfile() {
  const athlete = {
    id: 1,
    name: "Rahul Sharma",
    age: 20,
    gender: "Male",
    sport: "Football",
    state: "Delhi",
    status: "Verified",
    results: [
      { test: "Vertical Jump", score: "52 cm", status: "Verified" },
      { test: "Sit-ups", score: "48 reps", status: "Verified" },
      { test: "Shuttle Run", score: "9.8 sec", status: "Pending" },
    ],
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{athlete.name}</CardTitle>
            <Badge variant={athlete.status === "Verified" ? "default" : "secondary"}>
              {athlete.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <p><strong>Age:</strong> {athlete.age}</p>
            <p><strong>Gender:</strong> {athlete.gender}</p>
            <p><strong>Sport:</strong> {athlete.sport}</p>
          </div>
          <div>
            <p><strong>State:</strong> {athlete.state}</p>
            <p><strong>ID:</strong> #{athlete.id}</p>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Verified Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {athlete.results.map((result, idx) => (
                <TableRow key={idx}>
                  <TableCell>{result.test}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                    <Badge variant={result.status === "Verified" ? "default" : "outline"}>
                      {result.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/athletes">Back</Link>
            </Button>
            <Button>Verify Athlete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
