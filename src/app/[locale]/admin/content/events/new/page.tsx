'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewEvent() {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: { en: '', es: '', fr: '', ht: '' },
    date: '',
    time: '',
    location: { en: '', es: '', fr: '', ht: '' },
    description: { en: '', es: '', fr: '', ht: '' },
    category: { en: '', es: '', fr: '', ht: '' },
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/content/events`);
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link href={`/${locale}/admin/content/events`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-600 mt-2">Add a new church event</p>
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
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => updateSimpleField('time', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Image URL (optional)</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => updateSimpleField('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Title */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Event Title</CardTitle>
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

            {/* Location */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Location</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('location')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location-en">English *</Label>
                  <Input
                    id="location-en"
                    value={formData.location.en}
                    onChange={(e) => updateField('location', 'en', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location-es">Spanish</Label>
                  <Input
                    id="location-es"
                    value={formData.location.es}
                    onChange={(e) => updateField('location', 'es', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location-fr">French</Label>
                  <Input
                    id="location-fr"
                    value={formData.location.fr}
                    onChange={(e) => updateField('location', 'fr', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location-ht">Haitian Creole</Label>
                  <Input
                    id="location-ht"
                    value={formData.location.ht}
                    onChange={(e) => updateField('location', 'ht', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Category</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('category')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category-en">English *</Label>
                  <Input
                    id="category-en"
                    value={formData.category.en}
                    onChange={(e) => updateField('category', 'en', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category-es">Spanish</Label>
                  <Input
                    id="category-es"
                    value={formData.category.es}
                    onChange={(e) => updateField('category', 'es', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category-fr">French</Label>
                  <Input
                    id="category-fr"
                    value={formData.category.fr}
                    onChange={(e) => updateField('category', 'fr', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category-ht">Haitian Creole</Label>
                  <Input
                    id="category-ht"
                    value={formData.category.ht}
                    onChange={(e) => updateField('category', 'ht', e.target.value)}
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
              <Link href={`/${locale}/admin/content/events`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
