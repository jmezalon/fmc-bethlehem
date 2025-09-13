'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewGroup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: { en: '', es: '', fr: '', ht: '' },
    description: { en: '', es: '', fr: '', ht: '' },
    dayOfWeek: '',
    time: '',
    language: '',
    lifeStage: '',
    location: { en: '', es: '', fr: '', ht: '' },
    contactEmail: '',
    leader: { en: '', es: '', fr: '', ht: '' },
    capacity: '',
    currentMembers: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/groups');
      } else {
        alert('Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group');
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
          <Link href="/admin/groups">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Groups
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Group</h1>
            <p className="text-gray-600 mt-2">Add a new small group or ministry</p>
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
                    <Label htmlFor="dayOfWeek">Day of Week</Label>
                    <Select value={formData.dayOfWeek} onValueChange={(value) => updateSimpleField('dayOfWeek', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                        <SelectItem value="Saturday">Saturday</SelectItem>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={formData.language} onValueChange={(value) => updateSimpleField('language', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Haitian Creole">Haitian Creole</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lifeStage">Life Stage</Label>
                    <Select value={formData.lifeStage} onValueChange={(value) => updateSimpleField('lifeStage', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select life stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Children">Children</SelectItem>
                        <SelectItem value="Youth">Youth</SelectItem>
                        <SelectItem value="Adults">Adults</SelectItem>
                        <SelectItem value="Seniors">Seniors</SelectItem>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateSimpleField('contactEmail', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={(e) => updateSimpleField('capacity', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentMembers">Current Members</Label>
                    <Input
                      id="currentMembers"
                      type="number"
                      min="0"
                      value={formData.currentMembers}
                      onChange={(e) => updateSimpleField('currentMembers', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Group Name */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Group Name</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('name')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name-en">English *</Label>
                  <Input
                    id="name-en"
                    value={formData.name.en}
                    onChange={(e) => updateField('name', 'en', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name-es">Spanish</Label>
                  <Input
                    id="name-es"
                    value={formData.name.es}
                    onChange={(e) => updateField('name', 'es', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="name-fr">French</Label>
                  <Input
                    id="name-fr"
                    value={formData.name.fr}
                    onChange={(e) => updateField('name', 'fr', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="name-ht">Haitian Creole</Label>
                  <Input
                    id="name-ht"
                    value={formData.name.ht}
                    onChange={(e) => updateField('name', 'ht', e.target.value)}
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

            {/* Leader */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Group Leader</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => autoFillTranslations('leader')}
                  >
                    Auto-fill with English
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="leader-en">English *</Label>
                  <Input
                    id="leader-en"
                    value={formData.leader.en}
                    onChange={(e) => updateField('leader', 'en', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="leader-es">Spanish</Label>
                  <Input
                    id="leader-es"
                    value={formData.leader.es}
                    onChange={(e) => updateField('leader', 'es', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="leader-fr">French</Label>
                  <Input
                    id="leader-fr"
                    value={formData.leader.fr}
                    onChange={(e) => updateField('leader', 'fr', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="leader-ht">Haitian Creole</Label>
                  <Input
                    id="leader-ht"
                    value={formData.leader.ht}
                    onChange={(e) => updateField('leader', 'ht', e.target.value)}
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
              <Link href="/admin/groups">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Creating...' : 'Create Group'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
