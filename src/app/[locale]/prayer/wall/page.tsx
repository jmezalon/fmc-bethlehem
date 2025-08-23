'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Heart, Users, ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

interface PrayerRequest {
  id: string;
  initials: string;
  request: string;
  submittedAt: string;
  isPublic: boolean;
}

export default function PrayerWallPage() {
  const t = useTranslations('prayer');
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const response = await fetch('/api/prayer/public');
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

    fetchPrayers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Container className="py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/prayer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('wall.backToPrayer')}
          </Link>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('wall.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('wall.subtitle')}
          </p>
        </div>

        {/* Submit Prayer CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {t('wall.submitCta')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('wall.submitDescription')}
              </p>
            </div>
            <Link href="/prayer">
              <Button className="bg-blue-600 hover:bg-blue-700">
                {t('wall.submitPrayer')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Prayer Requests */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">{t('wall.loading')}</p>
            </div>
          ) : prayers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('wall.empty.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('wall.empty.description')}
              </p>
              <Link href="/prayer">
                <Button>{t('wall.empty.firstPrayer')}</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prayers.map(prayer => (
                <div
                  key={prayer.id}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {prayer.initials}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {formatDate(prayer.submittedAt)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {prayer.request}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 italic">
                      {t('wall.prayerNote')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Message */}
        {prayers.length > 0 && (
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600">{t('wall.footerMessage')}</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
