'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Calendar, Download, ExternalLink } from 'lucide-react';

interface CalendarSubscribeProps {
  type?: 'events' | 'services' | 'all';
  className?: string;
}

export function CalendarSubscribe({ type = 'all', className = '' }: CalendarSubscribeProps) {
  const t = useTranslations('calendar');
  const locale = useLocale();
  const [isDownloading, setIsDownloading] = useState(false);

  const getCalendarUrl = (calendarType: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/api/calendar/${calendarType}?locale=${locale}`;
  };

  const handleDownload = async (calendarType: string) => {
    setIsDownloading(true);
    try {
      const url = getCalendarUrl(calendarType);
      
      if (typeof window !== 'undefined') {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `fmc-bethlehem-${calendarType}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Failed to download calendar:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSubscribe = (calendarType: string) => {
    const url = getCalendarUrl(calendarType);
    const webcalUrl = url.replace(/^https?:/, 'webcal:');
    
    if (typeof window !== 'undefined') {
      window.open(webcalUrl, '_blank');
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">
          {t('subscribe.title')}
        </h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {t('subscribe.description')}
      </p>

      <div className="space-y-2">
        {type === 'all' && (
          <>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSubscribe('all')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('subscribe.complete')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload('all')}
                disabled={isDownloading}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSubscribe('events')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('subscribe.eventsOnly')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload('events')}
                disabled={isDownloading}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSubscribe('services')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('subscribe.servicesOnly')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload('services')}
                disabled={isDownloading}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
        
        {type !== 'all' && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSubscribe(type)}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t(`subscribe.${type}`)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(type)}
              disabled={isDownloading}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        {t('subscribe.instructions')}
      </p>
    </div>
  );
}
