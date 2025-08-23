'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';
import Link from 'next/link';
import { Calendar, Clock, Users, MessageCircle, Share2 } from 'lucide-react';

export default function LivePage() {
  const t = useTranslations('watchPages');
  const tCommon = useTranslations('common');

  // This would typically come from a CMS or environment variable
  const liveVideoId = 'dQw4w9WgXcQ'; // Replace with actual live stream video ID
  const isLive = true; // This would be determined by checking if stream is active

  const upcomingServices = [
    {
      title: t('live.upcoming.sundayMorning'),
      time: t('live.upcoming.sundayMorningTime'),
      language: t('live.upcoming.creole'),
      day: t('live.upcoming.sunday'),
    },
    {
      title: t('live.upcoming.sundayAfternoon'),
      time: t('live.upcoming.sundayAfternoonTime'),
      language: t('live.upcoming.englishCreole'),
      day: t('live.upcoming.sunday'),
    },
    {
      title: t('live.upcoming.wednesdayPrayer'),
      time: t('live.upcoming.wednesdayTime'),
      language: t('live.upcoming.multiLang'),
      day: t('live.upcoming.wednesday'),
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <Container>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {isLive && (
                <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {t('live.status.live')}
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t('live.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('live.subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Live Stream Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video mb-8">
              <YouTubeEmbed
                videoId={liveVideoId}
                title={t('live.streamTitle')}
                autoplay={false}
                className="w-full h-full"
              />
            </div>

            {/* Stream Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {isLive ? t('live.nowPlaying') : t('live.nextService')}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span>{t('live.currentService.date')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>{t('live.currentService.time')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span>{t('live.currentService.language')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {t('live.interact.title')}
                </h3>
                <div className="space-y-3">
                  <button className="flex items-center gap-3 w-full p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>{t('live.interact.chat')}</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Share2 className="h-5 w-5 text-primary" />
                    <span>{t('live.interact.share')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming Services */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t('live.upcoming.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingServices.map((service, index) => (
                <div key={index} className="bg-card border rounded-lg p-6">
                  <h3 className="font-semibold text-card-foreground mb-3">
                    {service.title}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{service.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{service.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{service.language}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('live.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('live.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={'/watch/sermons' as any}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                {t('live.cta.watchSermons')}
              </Link>
              <Link
                href={'/plan-visit' as any}
                className="inline-flex items-center gap-2 border border-input bg-background px-6 py-3 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t('live.cta.planVisit')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
