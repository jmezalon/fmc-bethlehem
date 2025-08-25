import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Play, Video, Calendar, Clock } from 'lucide-react';

export default function WatchPage() {
  const t = useTranslations('watch');
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Watch Options */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Live Stream */}
            <div className="bg-card rounded-lg border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('liveStream')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('liveStreamDesc')}
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{t('serviceSchedule')}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{t('sundayService')}: 9:00 AM</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{t('wednesdayPrayer')}: 7:00 PM</span>
                  </div>
                </div>
              </div>
              <Link
                href={"/watch/live" as any}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                <Play className="h-5 w-5" />
                {t('watchLive')}
              </Link>
            </div>

            {/* Sermon Archive */}
            <div className="bg-card rounded-lg border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('sermonArchive')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('sermonArchiveDesc')}
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  {t('archiveInfo')}
                </p>
              </div>
              <Link
                href={"/watch/sermons" as any}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                <Video className="h-5 w-5" />
                {t('browseSermons')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
