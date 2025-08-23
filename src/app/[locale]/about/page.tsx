import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Heart, Users, Globe, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');

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

      {/* Mission Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('mission.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('mission.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('values.love.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('values.love.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('values.community.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('values.community.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('values.service.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('values.service.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('values.truth.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('values.truth.description')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* History Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('history.title')}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                {t('history.founding')}
              </p>
              <p className="mb-6">
                {t('history.growth')}
              </p>
              <p>
                {t('history.today')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('leadership.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('leadership.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {t('leadership.pastor.name')}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {t('leadership.pastor.title')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('leadership.pastor.bio')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {t('leadership.associate.name')}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {t('leadership.associate.title')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('leadership.associate.bio')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {t('leadership.youth.name')}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {t('leadership.youth.title')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('leadership.youth.bio')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
