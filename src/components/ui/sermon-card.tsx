'use client';

import { useTranslations, useLocale } from 'next-intl';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';
import { Calendar, Clock, User, Tag, Globe } from 'lucide-react';

interface SermonCardProps {
  sermon: {
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
    speaker: {
      en: string;
      ht: string;
      fr: string;
    };
    date: string;
    duration: string;
    videoId: string;
    series?: {
      en: string;
      ht: string;
      fr: string;
    };
    topic: string;
    language: string;
  };
}

export function SermonCard({ sermon }: SermonCardProps) {
  const t = useTranslations('watch.sermons');
  const locale = useLocale() as 'en' | 'ht' | 'fr';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
    <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Video Thumbnail */}
      <div className="aspect-video">
        <YouTubeEmbed
          videoId={sermon.videoId}
          title={sermon.title[locale]}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-3">
          {/* Series Badge */}
          {sermon.series && (
            <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              <Tag className="h-3 w-3" />
              {sermon.series[locale]}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-card-foreground line-clamp-2">
            {sermon.title[locale]}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-3">
            {sermon.description[locale]}
          </p>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="truncate">{sermon.speaker[locale]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(sermon.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{sermon.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{sermon.language}</span>
            </div>
          </div>

          {/* Topic */}
          <div className="pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">
              {t('topic')}: {sermon.topic}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
