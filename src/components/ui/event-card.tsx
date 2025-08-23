'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Calendar, Clock, MapPin, Users, Download } from 'lucide-react';

interface EventCardProps {
  event: {
    id: string;
    title: {
      en: string;
      ht: string;
      fr: string;
    };
    description: {
      en: string;
      ht: string;
      fr: string;
    };
    date: string;
    time: string;
    location: {
      en: string;
      ht: string;
      fr: string;
    };
    category: {
      en: string;
      ht: string;
      fr: string;
    };
    isRecurring?: boolean;
  };
  onExportICS: (event: any) => void;
}

export function EventCard({ event, onExportICS }: EventCardProps) {
  const t = useTranslations('events');
  const locale = useLocale() as 'en' | 'ht' | 'fr';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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

  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <div
      className={`bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow ${
        !isUpcoming ? 'opacity-75' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isUpcoming
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {event.category[locale]}
              </span>
              {event.isRecurring && (
                <span className="text-xs text-muted-foreground">
                  {t('recurring')}
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {event.title[locale]}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {event.description[locale]}
            </p>
          </div>

          <button
            onClick={() => onExportICS(event)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            title={t('exportToCalendar')}
          >
            <Download className="h-4 w-4" />
          </button>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime(event.time)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location[locale]}</span>
          </div>
        </div>

        {/* Action Button */}
        {isUpcoming && (
          <div className="pt-4 border-t border-border">
            <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
              {t('learnMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
