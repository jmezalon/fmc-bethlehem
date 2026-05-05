'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Save, ArrowLeft, Eye, EyeOff, ImageIcon } from 'lucide-react';

interface FlyerData {
  active: boolean;
  title: string;
  subtitle: string;
  portraitImage: string;
  landscapeImage: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  linkUrl: string;
}

const EMPTY_FLYER: FlyerData = {
  active: false,
  title: '',
  subtitle: '',
  portraitImage: '',
  landscapeImage: '',
  startDate: '',
  endDate: '',
  time: '',
  location: '',
  linkUrl: '/events',
};

export default function FlyerAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [flyer, setFlyer] = useState<FlyerData>(EMPTY_FLYER);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/flyers', {
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        const data = await res.json();
        setFlyer({ ...EMPTY_FLYER, ...data });
        setIsAuthenticated(true);
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      setAuthError('Failed to authenticate');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage('');
    setSaveError('');
    try {
      const res = await fetch('/api/admin/flyers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(flyer),
      });
      if (res.ok) {
        setSaveMessage('Featured flyer saved successfully!');
      } else {
        setSaveError('Failed to save. Please try again.');
      }
    } catch {
      setSaveError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const update = (field: keyof FlyerData, value: string | boolean) =>
    setFlyer(prev => ({ ...prev, [field]: value }));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Featured Flyer</h1>
            <p className="text-gray-600">Enter your admin password to manage the featured flyer</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            {authError && <p className="text-red-600 text-sm text-center">{authError}</p>}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {authLoading ? 'Authenticating...' : 'Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/en/admin/content"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Featured Flyer</h1>
            <p className="text-gray-600 mt-1">
              Control what event flyer appears on the home page.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Active toggle */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Visibility</h2>
                <p className="text-sm text-gray-500">Show or hide the featured flyer on the home page.</p>
              </div>
              <button
                type="button"
                onClick={() => update('active', !flyer.active)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  flyer.active ? 'bg-purple-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={flyer.active}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    flyer.active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className={`mt-2 text-sm font-medium ${flyer.active ? 'text-purple-700' : 'text-gray-400'}`}>
              {flyer.active ? (
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> Visible on home page</span>
              ) : (
                <span className="flex items-center gap-1"><EyeOff className="h-4 w-4" /> Hidden from home page</span>
              )}
            </p>
          </div>

          {/* Event details */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={flyer.title}
                onChange={e => update('title', e.target.value)}
                placeholder="Annual Revival 2026"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Theme</label>
              <input
                type="text"
                value={flyer.subtitle}
                onChange={e => update('subtitle', e.target.value)}
                placeholder="The Manifestation of The Power of the Holy Spirit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={flyer.startDate}
                  onChange={e => update('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={flyer.endDate}
                  onChange={e => update('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="text"
                value={flyer.time}
                onChange={e => update('time', e.target.value)}
                placeholder="7:00PM – 9:30PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={flyer.location}
                onChange={e => update('location', e.target.value)}
                placeholder="4415 Glenwood Rd Brooklyn NY 11203"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Learn More Link</label>
              <input
                type="text"
                value={flyer.linkUrl}
                onChange={e => update('linkUrl', e.target.value)}
                placeholder="/events"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <p className="mt-1 text-xs text-gray-400">Internal path (e.g. /events) or full URL</p>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg border p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Flyer Images</h2>
            <p className="text-sm text-gray-500">
              Upload your flyer images to Cloudinary (or any image host) and paste the URLs below.
              Use the <strong>portrait</strong> version for mobile and the <strong>landscape</strong> version for desktop.
            </p>

            {/* Portrait */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portrait Image URL <span className="text-gray-400">(mobile)</span>
              </label>
              <input
                type="url"
                value={flyer.portraitImage}
                onChange={e => update('portraitImage', e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              {flyer.portraitImage && (
                <div className="mt-3 relative rounded-lg overflow-hidden border bg-gray-50"
                     style={{ maxWidth: 180, aspectRatio: '9/11' }}>
                  <Image
                    src={flyer.portraitImage}
                    alt="Portrait preview"
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
              )}
              {!flyer.portraitImage && (
                <div className="mt-3 flex items-center gap-2 text-gray-400 text-sm">
                  <ImageIcon className="h-4 w-4" /> No image set
                </div>
              )}
            </div>

            {/* Landscape */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landscape Image URL <span className="text-gray-400">(desktop)</span>
              </label>
              <input
                type="url"
                value={flyer.landscapeImage}
                onChange={e => update('landscapeImage', e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              {flyer.landscapeImage && (
                <div className="mt-3 relative rounded-lg overflow-hidden border bg-gray-50"
                     style={{ maxWidth: 400, aspectRatio: '16/7' }}>
                  <Image
                    src={flyer.landscapeImage}
                    alt="Landscape preview"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
              )}
              {!flyer.landscapeImage && (
                <div className="mt-3 flex items-center gap-2 text-gray-400 text-sm">
                  <ImageIcon className="h-4 w-4" /> No image set
                </div>
              )}
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 disabled:opacity-50 transition-colors shadow"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Featured Flyer'}
            </button>
            {saveMessage && <p className="text-green-600 text-sm font-medium">{saveMessage}</p>}
            {saveError && <p className="text-red-600 text-sm font-medium">{saveError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
