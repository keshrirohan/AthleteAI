import { AdminNav } from "@/components/admin/admin-nav"
import { AthleteTable } from "@/components/admin/athlete-table"

export default function AdminAthletesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Athlete Management</h1>
            <p className="text-muted-foreground">View, search, and manage athlete profiles and performance data</p>
          </div>

          <AthleteTable />
        </main>
      </div>
    </div>
  )
}
