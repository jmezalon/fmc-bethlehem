'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Calendar, Clock, MapPin, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventDetailModalProps {
  event: {
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
    date: string;
    time: string;
    location: {
      en: string;
      ht: string;
      fr: string;
      es: string;
    };
    category: {
      en: string;
      ht: string;
      fr: string;
      es: string;
    };
    image?: string;
    isRecurring?: boolean;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onExportICS: (event: any) => void;
}

export function EventDetailModal({ event, isOpen, onClose, onExportICS }: EventDetailModalProps) {
  const t = useTranslations('events');
  const locale = useLocale() as 'en' | 'ht' | 'fr' | 'es';

  if (!isOpen || !event) return null;

  const formatDate = (dateString: string) => {
    // Parse date in local timezone to avoid UTC conversion issues
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString(
      locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'en-US',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString(
      locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'en-US',
      {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }
    );
  };

  const isUpcoming = (() => {
    const [year, month, day] = event.date.split('-');
    const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    return eventDate >= today;
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header with Image */}
        {event.image && (
          <div className="relative h-64 w-full">
            <img 
              src={event.image} 
              alt={event.title[locale]}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-white backdrop-blur-sm">
                {event.category[locale]}
              </span>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {/* Close button for events without image */}
        {!event.image && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="space-y-6">
            {/* Title and Category (for events without image) */}
            {!event.image && (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    isUpcoming ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {event.category[locale]}
                  </span>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {event.title[locale]}
              </h2>
              {event.isRecurring && (
                <span className="text-sm text-gray-500">
                  {t('recurring')}
                </span>
              )}
            </div>

            {/* Event Details */}
            <div className="grid gap-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{formatTime(event.time)}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{event.location[locale]}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('cta.eventDescription')}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description[locale]}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={() => onExportICS(event)}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                {t('cta.exportToCalendar')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
