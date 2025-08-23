'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/container';
import {
  SermonFilters,
  type SermonFilters as SermonFiltersType,
} from '@/components/ui/sermon-filters';
import { SermonCard } from '@/components/ui/sermon-card';
import Link from 'next/link';
import { Play, ArrowLeft } from 'lucide-react';

// Import sermon data
import sermonsData from '@/../../data/sermons.json';

export default function SermonsPage() {
  const t = useTranslations('watch.sermons');
  const locale = useLocale() as 'en' | 'ht' | 'fr';
  const [filters, setFilters] = useState<SermonFiltersType>({
    search: '',
    series: '',
    topic: '',
    language: '',
    speaker: '',
    year: '',
  });

  // Extract available filter options from data
  const availableFilters = useMemo(() => {
    const series = Array.from(
      new Set(sermonsData.map((s: any) => s.series?.[locale]).filter(Boolean))
    );
    const topics = Array.from(
      new Set(sermonsData.map((s: any) => 'Faith & Spirituality'))
    );
    const languages = Array.from(
      new Set(['English', 'Haitian Creole', 'French'])
    );
    const speakers = Array.from(
      new Set(sermonsData.map((s: any) => s.speaker?.[locale]))
    );
    const years = Array.from(
      new Set(sermonsData.map((s: any) => new Date(s.date).getFullYear()))
    ).sort((a: any, b: any) => b - a);

    return {
      series: series.sort(),
      topics: topics.sort(),
      languages: languages.sort(),
      speakers: speakers.sort(),
      years,
    };
  }, [locale]);

  // Filter sermons based on current filters
  const filteredSermons = useMemo(() => {
    return sermonsData.filter((sermon: any) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          sermon.title.en.toLowerCase().includes(searchTerm) ||
          sermon.title.ht.toLowerCase().includes(searchTerm) ||
          sermon.title.fr.toLowerCase().includes(searchTerm) ||
          sermon.description.en.toLowerCase().includes(searchTerm) ||
          sermon.description.ht.toLowerCase().includes(searchTerm) ||
          sermon.description.fr.toLowerCase().includes(searchTerm) ||
          sermon.speaker.en.toLowerCase().includes(searchTerm) ||
          sermon.speaker.ht.toLowerCase().includes(searchTerm) ||
          sermon.speaker.fr.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Series filter
      if (filters.series && sermon.series?.[locale] !== filters.series)
        return false;

      // Topic filter
      if (filters.topic && sermon.topic !== filters.topic) return false;

      // Language filter
      if (filters.language && sermon.language !== filters.language)
        return false;

      // Speaker filter
      if (filters.speaker && sermon.speaker[locale] !== filters.speaker)
        return false;

      // Year filter
      if (filters.year) {
        const sermonYear = new Date(sermon.date).getFullYear();
        if (sermonYear.toString() !== filters.year) return false;
      }

      return true;
    });
  }, [filters, locale]);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <Container>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Link
                href={'/watch/live' as any}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToLive')}
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <Container>
          <SermonFilters
            onFiltersChange={setFilters}
            availableFilters={availableFilters}
          />
        </Container>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <Container>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {t('results.title')}
              </h2>
              <span className="text-muted-foreground">
                {t('results.count', { count: filteredSermons.length })}
              </span>
            </div>
          </div>

          {filteredSermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.map((sermon: any) => (
                <SermonCard
                  key={sermon.id}
                  sermon={{
                    ...sermon,
                    videoId: sermon.videoUrl?.split('v=')[1] || 'dQw4w9WgXcQ',
                    topic: 'Faith & Spirituality',
                    language: 'Multilingual',
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('noResults.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('noResults.description')}
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      search: '',
                      series: '',
                      topic: '',
                      language: '',
                      speaker: '',
                      year: '',
                    })
                  }
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('noResults.clearFilters')}
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={'/watch/live' as any}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                <Play className="h-5 w-5" />
                {t('cta.watchLive')}
              </Link>
              <Link
                href={'/plan-visit' as any}
                className="inline-flex items-center gap-2 border border-input bg-background px-6 py-3 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t('cta.planVisit')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
