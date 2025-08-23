'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Users,
  Heart,
  BookOpen,
  Zap,
  Video,
  Moon,
  Droplets,
  Crown,
} from 'lucide-react';

export default function SchedulePage() {
  const t = useTranslations('schedule');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const weeklySchedule = [
    {
      day: 'sunday',
      events: [
        {
          time: '8:00 AM',
          title: t('sunday.sunSchool'),
          description: t('sunday.sunSchoolDesc'),
          icon: BookOpen,
          type: 'regular',
        },
        {
          time: '9:00 - 11:30 AM',
          title: t('sunday.morningWorship'),
          description: t('sunday.morningWorshipDesc'),
          icon: Heart,
          type: 'worship',
        },
        {
          time: '12:30 - 2:30 PM',
          title: t('sunday.afternoonWorship'),
          description: t('sunday.afternoonWorshipDesc'),
          icon: Users,
          type: 'worship',
        },
      ],
    },
    {
      day: 'monday',
      events: [
        {
          time: '8:00 AM - 12:00 PM',
          title: t('monday.kaseChenn'),
          description: t('monday.kaseChennDesc'),
          icon: Heart,
          type: 'prayer',
        },
        {
          time: '5:30 - 7:00 PM',
          title: t('monday.youthBible'),
          description: t('monday.youthBibleDesc'),
          icon: Users,
          type: 'study',
        },
        {
          time: '7:15 - 9:00 PM',
          title: t('monday.generalBible'),
          description: t('monday.generalBibleDesc'),
          icon: BookOpen,
          type: 'study',
        },
      ],
    },
    {
      day: 'tuesday',
      events: [
        {
          time: '11:30 AM - 12:15 PM',
          title: t('multiDay.prayer'),
          description: t('multiDay.prayerDesc'),
          icon: Video,
          type: 'online',
        },
      ],
    },
    {
      day: 'wednesday',
      events: [
        {
          time: '11:30 AM - 12:15 PM',
          title: t('multiDay.prayer'),
          description: t('multiDay.prayerDesc'),
          icon: Video,
          type: 'online',
        },
        {
          time: '7:00 - 9:30 PM',
          title: t('wednesday.combat'),
          description: t('wednesday.combatDesc'),
          icon: Zap,
          type: 'prayer',
        },
      ],
    },
    {
      day: 'thursday',
      events: [
        {
          time: '11:30 AM - 12:15 PM',
          title: t('multiDay.prayer'),
          description: t('multiDay.prayerDesc'),
          icon: Video,
          type: 'online',
        },
      ],
    },
    {
      day: 'friday',
      events: [
        {
          time: '11:30 AM - 12:15 PM',
          title: t('multiDay.prayer'),
          description: t('multiDay.prayerDesc'),
          icon: Video,
          type: 'online',
        },
      ],
    },
    {
      day: 'saturday',
      events: [
        {
          time: '8:00 AM - 12:00 PM',
          title: t('saturday.fasting'),
          description: t('saturday.fastingDesc'),
          icon: Droplets,
          type: 'prayer',
        },
      ],
    },
  ];

  const specialEvents = [
    {
      title: t('special.communion.title'),
      description: t('special.communion.description'),
      frequency: t('special.communion.frequency'),
      icon: Crown,
      type: 'communion',
    },
    {
      title: t('special.watchNight.title'),
      description: t('special.watchNight.description'),
      frequency: t('special.watchNight.frequency'),
      icon: Moon,
      type: 'watchnight',
    },
    {
      title: t('special.marriageMinistry.title'),
      description: t('special.marriageMinistry.description'),
      frequency: t('special.marriageMinistry.frequency'),
      icon: Heart,
      type: 'marriage',
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'worship':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'prayer':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'study':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'online':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'communion':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'watchnight':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'marriage':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
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

      {/* Weekly Schedule */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('weeklyTitle')}
          </h2>

          <div className="space-y-8">
            {weeklySchedule.map(daySchedule => (
              <div
                key={daySchedule.day}
                className="bg-card border rounded-lg p-6"
              >
                <h3 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  {t(`days.${daySchedule.day}`)}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {daySchedule.events.map((event, index) => {
                    const IconComponent = event.icon;
                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${getEventTypeColor(event.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <IconComponent className="h-5 w-5 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {event.time}
                              </span>
                            </div>
                            <h4 className="font-semibold mb-1">
                              {event.title}
                            </h4>
                            <p className="text-sm opacity-90">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Online Prayer Info */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center justify-center gap-3">
              <Video className="h-8 w-8 text-primary" />
              {t('zoom.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('zoom.description')}
            </p>

            <div className="bg-card border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">
                    {t('zoom.meetingId')}
                  </h4>
                  <p className="text-lg font-mono bg-muted px-3 py-2 rounded">
                    457 357 0961
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">
                    {t('zoom.passcode')}
                  </h4>
                  <p className="text-lg font-mono bg-muted px-3 py-2 rounded">
                    a5ia6i
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {t('zoom.schedule')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Special Events */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('specialTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specialEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-6 ${getEventTypeColor(event.type)}`}
                >
                  <div className="flex items-start gap-4">
                    <IconComponent className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="mb-3">{event.description}</p>
                      <p className="text-sm font-medium opacity-90">
                        {event.frequency}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pastors Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('pastors.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center bg-card border rounded-lg p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {t('pastors.senior')}
              </h3>
              <p className="text-lg text-primary font-medium">
                Rev. WidMarc Pierre
              </p>
            </div>

            <div className="text-center bg-card border rounded-lg p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {t('pastors.associate')}
              </h3>
              <p className="text-lg text-primary font-medium">
                Rev. Evans Pierre
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('contact.description')}
            </p>
            <Link
              href={'/plan-visit' as any}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              {t('contact.button')}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
