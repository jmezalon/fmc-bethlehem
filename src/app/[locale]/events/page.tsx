'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/container';
import { EventCard } from '@/components/ui/event-card';
import { CalendarView } from '@/components/ui/calendar-view';
import { CalendarSubscribe } from '@/components/ui/calendar-subscribe';
import { downloadICS } from '@/utils/ics-export';
import { Calendar, List, Filter } from 'lucide-react';

// Import events data
import eventsData from '@/../../data/events.json';

type ViewMode = 'list' | 'calendar';

export default function EventsPage() {
  const t = useTranslations('events');
  const locale = useLocale() as 'en' | 'ht' | 'fr';
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories
  const categories = Array.from(
    new Set(eventsData.map(event => event.category[locale]))
  );

  // Filter events
  const filteredEvents = eventsData.filter(event => {
    if (selectedCategory && event.category[locale] !== selectedCategory)
      return false;
    return true;
  });

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleExportICS = (event: any) => {
    downloadICS(event, locale);
  };

  const handleEventClick = (event: any) => {
    // Could open a modal or navigate to event detail page
    console.log('Event clicked:', event);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Controls Section */}
      <section className="py-8 border-b">
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="h-4 w-4" />
                {t('views.list')}
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Calendar className="h-4 w-4" />
                {t('views.calendar')}
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">{t('filters.allCategories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Container>
      </section>

      {/* Events Content */}
      <section className="py-16">
        <Container>
          {viewMode === 'list' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {t('upcoming')}
                </h2>
                <span className="text-muted-foreground">
                  {t('eventCount', { count: sortedEvents.length })}
                </span>
              </div>

              {sortedEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedEvents.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onExportICS={handleExportICS}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t('noEvents.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('noEvents.description')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <CalendarView
              events={sortedEvents}
              onEventClick={handleEventClick}
            />
          )}
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                  {t('cta.subscribe')}
                </button>
                <button className="inline-flex items-center gap-2 border border-input bg-background px-6 py-3 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
                  {t('cta.contact')}
                </button>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6 border">
              <CalendarSubscribe type="events" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
