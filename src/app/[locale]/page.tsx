'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { StructuredData } from '@/components/structured-data';
import { generateEventJsonLd } from '@/lib/structured-data';
import { Button } from '@/components/ui/button';
import { EventDetailModal } from '@/components/ui/event-detail-modal';
import { VideoPlayerModal } from '@/components/ui/video-player-modal';
import { downloadICS } from '@/utils/ics-export';
import { formatTime } from '@/utils/time-format';
import {
  Calendar,
  Clock,
  MapPin,
  Play,
  Users,
  Heart,
  BookOpen,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
// Data will be fetched from API

export default function HomePage() {
  const t = useTranslations('hero');
  const tService = useTranslations('serviceTimes');
  const tHome = useTranslations('home');
  const locale = useLocale() as 'en' | 'ht' | 'fr' | 'es';
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleExportICS = (event: any) => {
    downloadICS(event, locale);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, sermonsResponse] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/sermons')
        ]);
        
        const eventsData = await eventsResponse.json();
        const sermonsData = await sermonsResponse.json();
        
        setEvents(eventsData);
        setSermons(sermonsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate structured data for upcoming events
  const upcomingEvents = events.slice(0, 3);
  const eventStructuredData = upcomingEvents.map((event: any) =>
    generateEventJsonLd(event, locale)
  );

  if (loading) {
    return (
      <main>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <StructuredData data={eventStructuredData} />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/fmcb-hero.png"
            alt="FMCB Church Building"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <Container>
          <div className="relative py-20 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Service Times Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-start gap-3 p-4 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {tService('worship')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {tService('sunday')} • {tService('worshipTime')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 p-4 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20">
                <Heart className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {tService('prayer')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {tService('wednesday')} • {tService('prayerTime')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 p-4 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {tService('bible')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {tService('monday')} • {tService('bibleTime')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plan-visit"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
              >
                <MapPin className="h-5 w-5" />
                {tHome('planVisitCta')}
              </Link>
              <Link
                href="/watch"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-6 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
              >
                <Play className="h-5 w-5" />
                {tHome('watchLiveCta')}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Feature Tiles */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/watch" className="block">
              <div className="text-center p-8 rounded-lg bg-card border hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {tHome('watchMessages')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {tHome('watchMessagesDesc')}
                </p>
                <span className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors">
                  {tHome('watchNow')} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <Link href="/groups" className="block">
              <div className="text-center p-8 rounded-lg bg-card border hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {tHome('smallGroups')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {tHome('smallGroupsDesc')}
                </p>
                <span className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors">
                  {tHome('learnMore')} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <Link href="/prayer" className="block">
              <div className="text-center p-8 rounded-lg bg-card border hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {tHome('prayerRequests')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {tHome('prayerRequestsDesc')}
                </p>
                <span className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors">
                  {tHome('learnMore')} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Latest Sermons */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              {tHome('latestSermons')}
            </h2>
            <Link
              href={'/watch/sermons' as any}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {tHome('viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.slice(0, 3).map((sermon: any) => (
              <div
                key={sermon.id}
                className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                <img 
                  src={sermon.thumbnail} 
                  alt={sermon.title[locale]}
                  className="w-full h-full object-cover"
                />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(sermon.date).toLocaleDateString()}
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    {sermon.duration}
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-1">
                    {sermon.title[locale] || sermon.title.en}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {tHome('speaker')}:{' '}
                    {sermon.speaker[locale] || sermon.speaker.en}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {sermon.description[locale] || sermon.description.en}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSermon(sermon);
                      setIsVideoModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    {tHome('watchNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              {tHome('upcomingEvents')}
            </h2>
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {tHome('viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event: any) => (
              <div
                key={event.id}
                className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                <img 
                  src={event.image} 
                  alt={event.title[locale]}
                  className="w-full h-full object-cover"
                />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {(() => {
                      const [year, month, day] = event.date.split('-');
                      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      return date.toLocaleDateString();
                    })()}
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    {formatTime(event.time, locale)}
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-1">
                    {event.title[locale] || event.title.en}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {event.location[locale] || event.location.en}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                    {event.description[locale] || event.description.en}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {event.category[locale] || event.category.en}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      {tHome('learnMore')} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onExportICS={handleExportICS}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        sermon={selectedSermon}
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setSelectedSermon(null);
        }}
      />
    </main>
  );
}
