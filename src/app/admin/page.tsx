import { AdminNav } from "@/components/admin/admin-nav"
import { AdminOverview } from "@/components/admin/admin-overview"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">SAI Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor athlete performance, verify submissions, and manage the platform
            </p>
          </div>

          <AdminOverview />
        </main>
      </div>
    </div>
  )
}
