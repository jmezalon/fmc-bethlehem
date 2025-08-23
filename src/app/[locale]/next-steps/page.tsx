import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Heart, Users, Cross, HandHeart, GraduationCap } from 'lucide-react';

export default function NextStepsPage() {
  const t = useTranslations('nextSteps');

  const steps = [
    {
      id: 'salvation',
      title: t('salvation.title'),
      description: t('salvation.description'),
      icon: Cross,
      href: '/next-steps/salvation',
      color: 'bg-red-500'
    },
    {
      id: 'baptism',
      title: t('baptism.title'),
      description: t('baptism.description'),
      icon: Heart,
      href: '/next-steps/baptism',
      color: 'bg-blue-500'
    },
    {
      id: 'membership',
      title: t('membership.title'),
      description: t('membership.description'),
      icon: Users,
      href: '/next-steps/membership',
      color: 'bg-green-500'
    },
    {
      id: 'ministries',
      title: t('ministries.title'),
      description: t('ministries.description'),
      icon: HandHeart,
      href: '/next-steps/ministries',
      color: 'bg-purple-500'
    },
    {
      id: 'newMemberClass',
      title: t('newMemberClass.title'),
      description: t('newMemberClass.description'),
      icon: GraduationCap,
      href: '/next-steps/new-member-class',
      color: 'bg-orange-500'
    }
  ];

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

      {/* Steps Grid */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <Link
                  key={step.id}
                  href={step.href as any}
                  className="group block"
                >
                  <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary/50">
                    <div className="space-y-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="pt-2">
                        <span className="text-primary font-medium text-sm group-hover:underline">
                          {t('getStarted')} →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('support.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('support.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:methodistchurch1993@gmail.com?subject=Next Steps Question"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                {t('support.contact')}
              </a>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 border border-input bg-background px-6 py-3 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t('support.visitUs')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
