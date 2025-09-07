"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const sections = ["General", "Roles & Permissions", "Platform", "Security"];

export default function AdminSettingsPage() {
  const [active, setActive] = useState("General");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border p-6 bg-muted/30">
        <h2 className="text-lg font-bold mb-6">Settings</h2>
        <nav className="space-y-3">
          {sections.map((section) => (
            <Button
              key={section}
              variant={active === section ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActive(section)}
            >
              {section}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        {/* General Settings */}
        {active === "General" && (
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input id="platformName" placeholder="AthletiQ Admin Portal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input id="supportEmail" placeholder="support@athletiq.gov.in" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        )}

        {/* Roles & Permissions */}
        {active === "Roles & Permissions" && (
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Add Role</Label>
                <Input id="role" placeholder="e.g. Moderator" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Input id="permissions" placeholder="manage-users, view-reports" />
              </div>
              <Button>Add Role</Button>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Existing roles can be managed from the <b>Users</b> page.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Platform Settings */}
        {active === "Platform" && (
          <Card>
            <CardHeader>
              <CardTitle>Platform Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Enable Maintenance Mode</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow Athlete Registrations</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Data Sync</Label>
                <Switch />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        )}

        {/* Security */}
        {active === "Security" && (
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Two-Factor Authentication</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Login Notifications</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Weekly Reports</Label>
                <Switch defaultChecked />
              </div>
              <Button>Update Security</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
