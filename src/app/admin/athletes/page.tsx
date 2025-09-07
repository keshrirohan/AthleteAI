"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AthletesList() {
  const athletes = [
    { id: 1, name: "Rahul Sharma", sport: "Football", state: "Delhi", status: "Verified" },
    { id: 2, name: "Aman Verma", sport: "Cricket", state: "UP", status: "Pending" },
    { id: 3, name: "Karan Singh", sport: "Athletics", state: "Punjab", status: "Verified" },
  ]

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Athlete Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search athletes..." className="w-[250px]" />
            <Button>+ Add Athlete</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {athletes.map((athlete) => (
                <TableRow key={athlete.id}>
                  <TableCell>{athlete.name}</TableCell>
                  <TableCell>{athlete.sport}</TableCell>
                  <TableCell>{athlete.state}</TableCell>
                  <TableCell>
                    <Badge variant={athlete.status === "Verified" ? "default" : "destructive"}>
                      {athlete.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/athletes/${athlete.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
