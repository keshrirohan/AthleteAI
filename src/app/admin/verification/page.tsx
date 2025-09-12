import { AdminNav } from "@/components/admin/admin-nav"
import { VerificationQueue } from "@/components/admin/verification-queue"

export default function AdminVerificationPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Verification Queue</h1>
            <p className="text-muted-foreground">Review and verify athlete submissions flagged by AI analysis</p>
          </div>

          <VerificationQueue />
        </main>
      </div>
    </div>
  )
}
