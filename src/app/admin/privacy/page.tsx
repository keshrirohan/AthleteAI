"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminPrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-32">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Privacy & Data Policy</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          This page explains how AthletiQ collects, manages, and secures data
          for officials and administrators using the platform.
        </p>
      </header>

      {/* Main Card */}
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Policy Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-sm md:text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Admin profile details (name, email, role, organization)</li>
              <li>Login activity (timestamps, IP addresses, device type)</li>
              <li>System usage logs for monitoring and accountability</li>
            </ul>
          </section>

          <Separator />

          {/* Section 2 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">2. How We Use Data</h2>
            <p>
              Data is used exclusively for security, system monitoring, and
              reporting. Examples include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Verifying secure access to the admin portal</li>
              <li>Monitoring usage to prevent unauthorized activity</li>
              <li>Generating analytics for authorized sports authorities</li>
            </ul>
          </section>

          <Separator />

          {/* Section 3 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">3. Data Sharing & Disclosure</h2>
            <p>
              AthletiQ does not sell or rent admin data. Data may only be
              shared:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>With government-authorized sports authorities</li>
              <li>For compliance with legal requirements</li>
              <li>During security or disciplinary investigations</li>
            </ul>
          </section>

          <Separator />

          {/* Section 4 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">4. Security Measures</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption of sensitive data</li>
              <li>Multi-factor authentication for logins</li>
              <li>Regular audits and monitoring for vulnerabilities</li>
            </ul>
          </section>

          <Separator />

          {/* Section 5 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">5. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to access your stored data</li>
              <li>Right to request corrections to your data</li>
              <li>Right to request deletion where legally applicable</li>
            </ul>
          </section>

          <Separator />

          {/* Section 6 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">6. Contact Us</h2>
            <p>
              For any privacy-related concerns, please contact the AthletiQ
              Admin Support Team at:{" "}
              <span className="font-medium text-blue-600">
                support@athletiq.gov.in
              </span>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
