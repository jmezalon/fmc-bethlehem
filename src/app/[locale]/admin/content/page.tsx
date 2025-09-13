'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Play, Plus, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage church content and resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Events Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Events</div>
              <p className="text-xs text-muted-foreground">
                Add, edit, and remove church events
              </p>
              <div className="flex gap-2 mt-4">
                <Link href="/en/admin/content/events">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </Link>
                <Link href="/en/admin/content/events/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Groups Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Small Groups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Groups</div>
              <p className="text-xs text-muted-foreground">
                Add, edit, and remove small groups
              </p>
              <div className="flex gap-2 mt-4">
                <Link href="/en/admin/content/groups">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </Link>
                <Link href="/en/admin/content/groups/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Sermons Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sermons</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Sermons</div>
              <p className="text-xs text-muted-foreground">
                Add, edit, and remove sermon recordings
              </p>
              <div className="flex gap-2 mt-4">
                <Link href="/en/admin/content/sermons">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </Link>
                <Link href="/en/admin/content/sermons/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/en/admin/content/events/new">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
              </Link>
              <Link href="/en/admin/content/groups/new">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Create New Group
                </Button>
              </Link>
              <Link href="/en/admin/content/sermons/new">
                <Button variant="outline" className="w-full justify-start">
                  <Play className="h-4 w-4 mr-2" />
                  Add New Sermon
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
