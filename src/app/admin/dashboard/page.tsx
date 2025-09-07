"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Users, Activity, Globe, ShieldAlert } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";

// Dummy Data
const growthData = [
  { month: "Jan", athletes: 120 },
  { month: "Feb", athletes: 180 },
  { month: "Mar", athletes: 250 },
  { month: "Apr", athletes: 400 },
  { month: "May", athletes: 550 },
];

const testDistribution = [
  { name: "Vertical Jump", value: 120 },
  { name: "Sit-ups", value: 200 },
  { name: "Shuttle Run", value: 150 },
  { name: "Endurance Run", value: 80 },
  { name: "Height & Weight", value: 60 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminDashboard() {
  return (
    <div className="relative overflow-hidden py-28 px-6 sm:px-10 lg:px-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
        <Button variant="outline">Download Report</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-10">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            <CardTitle>Total Athletes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12,345</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-500" />
            <CardTitle>Tests Conducted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">45,210</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-yellow-500" />
            <CardTitle>Active States</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">28</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <CardTitle>Suspicious Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">67</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <Card>
          <CardHeader>
            <CardTitle>Athlete Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="athletes" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={testDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {testDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Athlete</th>
                <th className="p-3">Test</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Rahul Sharma</td>
                <td className="p-3">Vertical Jump</td>
                <td className="p-3">52 cm</td>
                <td className="p-3 text-green-600">Verified</td>
                <td className="p-3">2025-09-05</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Aisha Khan</td>
                <td className="p-3">Sit-ups</td>
                <td className="p-3">45 reps</td>
                <td className="p-3 text-yellow-600">Pending</td>
                <td className="p-3">2025-09-04</td>
              </tr>
              <tr>
                <td className="p-3">Vikas Yadav</td>
                <td className="p-3">Shuttle Run</td>
                <td className="p-3">6.2s</td>
                <td className="p-3 text-red-600">Suspicious</td>
                <td className="p-3">2025-09-04</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
