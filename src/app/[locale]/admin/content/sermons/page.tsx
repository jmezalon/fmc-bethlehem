'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Calendar, Trash2, ArrowLeft } from 'lucide-react';
import { Sermon } from '@/lib/database';

export default function SermonsManagement() {
  const locale = useLocale();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await fetch('/api/sermons');
      if (response.ok) {
        const data = await response.json();
        setSermons(data);
      }
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSermon = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;
    
    try {
      const response = await fetch(`/api/sermons/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSermons(sermons.filter(sermon => sermon.id !== id));
      }
    } catch (error) {
      console.error('Error deleting sermon:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading sermons...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/admin/content`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sermons Management</h1>
              <p className="text-gray-600 mt-2">Manage sermon recordings and messages</p>
            </div>
          </div>
          <Link href={`/${locale}/admin/content/sermons/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Sermon
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            <Card key={sermon.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{sermon.title.en}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(sermon.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Play className="h-4 w-4" />
                      {sermon.duration}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSermon(sermon.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <img 
                    src={sermon.thumbnail} 
                    alt={sermon.title.en}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {sermon.description.en}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{sermon.series.en}</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Speaker:</strong> {sermon.speaker.en}</p>
                  <a 
                    href={sermon.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Watch Video
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sermons.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Play className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sermons found</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first sermon.</p>
              <Link href={`/${locale}/admin/content/sermons/new`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Sermon
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
