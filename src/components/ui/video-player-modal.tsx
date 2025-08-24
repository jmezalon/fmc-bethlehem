'use client';

import { useTranslations, useLocale } from 'next-intl';
import { X, ExternalLink, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerModalProps {
  sermon: {
    id: string;
    title: {
      en: string;
      ht: string;
      fr: string;
      es: string;
    };
    description: {
      en: string;
      ht: string;
      fr: string;
      es: string;
    };
    speaker: {
      en: string;
      ht: string;
      fr: string;
      es: string;
    };
    date: string;
    duration: string;
    videoUrl: string;
    thumbnail: string;
    series?: {
      en: string;
      ht: string;
      fr: string;
      es: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ sermon, isOpen, onClose }: VideoPlayerModalProps) {
  const t = useTranslations('watchPages.sermons');
  const locale = useLocale() as 'en' | 'ht' | 'fr' | 'es';

  if (!isOpen || !sermon) return null;

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(sermon.videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  const formatDate = (dateString: string) => {
    // Parse date in local timezone to avoid UTC conversion issues
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString(
      locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
              {sermon.title[locale]}
            </h2>
            <p className="text-sm text-gray-600">
              {sermon.speaker[locale]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={sermon.title[locale]}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <p>Video not available</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 max-h-64 overflow-y-auto">
          <div className="space-y-4">
            {/* Series Badge */}
            {sermon.series && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {sermon.series[locale]}
              </div>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(sermon.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{sermon.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{sermon.speaker[locale]}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {sermon.description[locale]}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={() => window.open(sermon.videoUrl, '_blank')}
                variant="outline"
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Watch on YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
