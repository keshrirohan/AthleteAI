"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden py-28 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full"
      >
        <Card className="rounded-2xl shadow-lg border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Terms & Conditions
            </CardTitle>
            <p className="text-center text-muted-foreground mt-2">
              Last updated: September 12, 2025
            </p>
          </CardHeader>
          <CardContent className="space-y-8 text-base leading-relaxed">
            {/* Introduction */}
            <div>
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="mt-2 text-muted-foreground">
                By accessing or using <span className="font-medium">AthletiQ</span>, you agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </div>
            <Separator />

            {/* Use of Content */}
            <div>
              <h2 className="text-xl font-semibold">2. Use of Content</h2>
              <p className="mt-2 text-muted-foreground">
                All content provided on <span className="font-medium">AthletiQ</span> is for informational purposes only. Unauthorized use or duplication is prohibited.
              </p>
            </div>
            <Separator />

            {/* User Responsibilities */}
            <div>
              <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
              <p className="mt-2 text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
              </p>
            </div>
            <Separator />

            {/* Changes to Terms */}
            <div>
              <h2 className="text-xl font-semibold">4. Changes to Terms</h2>
              <p className="mt-2 text-muted-foreground">
                <span className="font-medium">AthletiQ</span> reserves the right to update these terms at any time. Changes will be posted on this page.
              </p>
            </div>
            <Separator />

            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold">5. Contact</h2>
              <p className="mt-2 text-muted-foreground">
                If you have any questions about these terms, please contact us.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}