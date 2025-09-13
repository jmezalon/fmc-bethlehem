'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewSermon() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: { en: '', es: '', fr: '', ht: '' },
    speaker: { en: '', es: '', fr: '', ht: '' },
    date: '',
    duration: '',
    description: { en: '', es: '', fr: '', ht: '' },
    videoUrl: '',
    thumbnail: '',
    series: { en: '', es: '', fr: '', ht: '' }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/sermons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/sermons');
      } else {
        alert('Failed to create sermon');
      }
    } catch (error) {
      console.error('Error creating sermon:', error);
      alert('Failed to create sermon');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, lang: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof typeof prev] as any,
        [lang]: value
      }
    }));
  };

  const updateSimpleField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const autoFillTranslations = (field: string) => {
    const englishValue = (formData[field as keyof typeof formData] as any).en;
    if (englishValue) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          en: englishValue,
          es: englishValue,
          fr: englishValue,
          ht: englishValue
        }
      }));
    }
  };

  const extractYouTubeThumbnail = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoId) {
      const thumbnail = `https://i.ytimg.com/vi/${videoId[1]}/hqdefault.jpg`;
      updateSimpleField('thumbnail', thumbnail);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/sermons">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sermons
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Sermon</h1>
            <p className="text-gray-600 mt-2">Add a new sermon recording</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateSimpleField('date', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (e.g., 45:30)</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => updateSimpleField('duration', e.target.value)}
                      placeholder="45:30"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="videoUrl">YouTube Video URL</Label>
                  <Input
                    id="videoUrl"
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => {
                      updateSimpleField('videoUrl', e.target.value);
                      extractYouTubeThumbnail(e.target.value);
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => updateSimpleField('thumbnail', e.target.value)}
                    placeholder="Auto-filled from YouTube URL"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Title */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sermon Title</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('title')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title-en">English *</Label>
                  <Input
                    id="title-en"
                    value={formData.title.en}
                    onChange={(e) => updateField('title', 'en', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title-es">Spanish</Label>
                  <Input
                    id="title-es"
                    value={formData.title.es}
                    onChange={(e) => updateField('title', 'es', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="title-fr">French</Label>
                  <Input
                    id="title-fr"
                    value={formData.title.fr}
                    onChange={(e) => updateField('title', 'fr', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="title-ht">Haitian Creole</Label>
                  <Input
                    id="title-ht"
                    value={formData.title.ht}
                    onChange={(e) => updateField('title', 'ht', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Speaker */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Speaker</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('speaker')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="speaker-en">English *</Label>
                  <Input
                    id="speaker-en"
                    value={formData.speaker.en}
                    onChange={(e) => updateField('speaker', 'en', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="speaker-es">Spanish</Label>
                  <Input
                    id="speaker-es"
                    value={formData.speaker.es}
                    onChange={(e) => updateField('speaker', 'es', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="speaker-fr">French</Label>
                  <Input
                    id="speaker-fr"
                    value={formData.speaker.fr}
                    onChange={(e) => updateField('speaker', 'fr', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="speaker-ht">Haitian Creole</Label>
                  <Input
                    id="speaker-ht"
                    value={formData.speaker.ht}
                    onChange={(e) => updateField('speaker', 'ht', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Series */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Series</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('series')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="series-en">English *</Label>
                  <Input
                    id="series-en"
                    value={formData.series.en}
                    onChange={(e) => updateField('series', 'en', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="series-es">Spanish</Label>
                  <Input
                    id="series-es"
                    value={formData.series.es}
                    onChange={(e) => updateField('series', 'es', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="series-fr">French</Label>
                  <Input
                    id="series-fr"
                    value={formData.series.fr}
                    onChange={(e) => updateField('series', 'fr', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="series-ht">Haitian Creole</Label>
                  <Input
                    id="series-ht"
                    value={formData.series.ht}
                    onChange={(e) => updateField('series', 'ht', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Description</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('description')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description-en">English *</Label>
                  <Textarea
                    id="description-en"
                    value={formData.description.en}
                    onChange={(e) => updateField('description', 'en', e.target.value)}
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description-es">Spanish</Label>
                  <Textarea
                    id="description-es"
                    value={formData.description.es}
                    onChange={(e) => updateField('description', 'es', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="description-fr">French</Label>
                  <Textarea
                    id="description-fr"
                    value={formData.description.fr}
                    onChange={(e) => updateField('description', 'fr', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="description-ht">Haitian Creole</Label>
                  <Textarea
                    id="description-ht"
                    value={formData.description.ht}
                    onChange={(e) => updateField('description', 'ht', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/admin/sermons">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Creating...' : 'Add Sermon'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
