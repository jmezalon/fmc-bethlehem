'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Calendar, Mail, User, Lock, Shield } from 'lucide-react';

interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  request: string;
  isPublic: boolean;
  initials: string;
  submittedAt: string;
}

export default function AdminPrayerPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [authError, setAuthError] = useState('');

  const authenticate = async () => {
    try {
      const response = await fetch('/api/admin/prayer/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret: secretKey }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthError('');
        fetchPrayers();
      } else {
        setAuthError('Invalid secret key');
      }
    } catch (error) {
      setAuthError('Authentication failed');
    }
  };

  const fetchPrayers = async () => {
    try {
      const response = await fetch('/api/admin/prayer', {
        headers: {
          'Authorization': `Bearer ${secretKey}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPrayers(data.prayers || []);
      }
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = async (prayerId: string, currentVisibility: boolean) => {
    try {
      const response = await fetch('/api/admin/prayer/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          prayerId,
          isPublic: !currentVisibility,
        }),
      });

      if (response.ok) {
        setPrayers(prayers.map(prayer => 
          prayer.id === prayerId 
            ? { ...prayer, isPublic: !currentVisibility }
            : prayer
        ));
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter the secret key to access prayer administration</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter secret key..."
                onKeyPress={(e) => e.key === 'Enter' && authenticate()}
              />
            </div>

            {authError && (
              <div className="text-red-600 text-sm">{authError}</div>
            )}

            <Button
              onClick={authenticate}
              className="w-full"
              disabled={!secretKey.trim()}
            >
              <Lock className="h-4 w-4 mr-2" />
              Authenticate
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prayer Administration</h1>
              <p className="text-gray-600 mt-2">Manage prayer requests and visibility settings</p>
            </div>
            <div className="text-sm text-gray-500">
              Total: {prayers.length} prayers
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Public Prayers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prayers.filter(p => p.isPublic).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeOff className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Private Prayers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prayers.filter(p => !p.isPublic).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prayers.filter(p => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(p.submittedAt) > weekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Requests */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Prayer Requests</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading prayers...</p>
            </div>
          ) : prayers.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No prayer requests found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {prayers.map((prayer) => (
                <div key={prayer.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {prayer.name || 'Anonymous'}
                          </span>
                          <span className="text-gray-400">({prayer.initials})</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          {prayer.email}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {formatDate(prayer.submittedAt)}
                        </div>
                      </div>

                      {/* Prayer Request */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {prayer.request}
                        </p>
                      </div>
                    </div>

                    {/* Visibility Toggle */}
                    <div className="ml-6">
                      <Button
                        onClick={() => toggleVisibility(prayer.id, prayer.isPublic)}
                        variant={prayer.isPublic ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {prayer.isPublic ? (
                          <>
                            <Eye className="h-4 w-4" />
                            Public
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Private
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
