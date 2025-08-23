'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Users,
  Accessibility,
  Languages,
  Calendar,
  Download,
  Car,
  Info,
} from 'lucide-react';

export default function PlanVisitPage() {
  const t = useTranslations('planVisit');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const generateICS = (service: 'morning' | 'youth') => {
    const now = new Date();
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + (7 - now.getDay()));
    
    let startTime, endTime, title, description;
    
    if (service === 'morning') {
      startTime = new Date(nextSunday);
      startTime.setHours(9, 0, 0, 0);
      endTime = new Date(nextSunday);
      endTime.setHours(11, 30, 0, 0);
      title = 'FMC Bethlehem - Morning Worship Service';
      description = 'Sunday School: 8:00 AM\\nWorship Service: 9:00-11:30 AM\\nLanguage: Haitian Creole';
    } else {
      startTime = new Date(nextSunday);
      startTime.setHours(12, 30, 0, 0);
      endTime = new Date(nextSunday);
      endTime.setHours(14, 30, 0, 0);
      title = 'FMC Bethlehem - Youth/Afternoon Service';
      description = 'Youth and Afternoon Service\\nLanguages: English & Haitian Creole';
    }

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FMC Bethlehem//Church Service//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startTime)}`,
      `DTEND:${formatDate(endTime)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      'LOCATION:4415 Glenwood Rd\\, Brooklyn\\, NY (Entrance on E 45th St)',
      'RRULE:FREQ=WEEKLY;BYDAY=SU',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fmc-bethlehem-${service}-service.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

      {/* Location & Map Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Address Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="h-8 w-8 text-primary" />
                {t('location.title')}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    {t('location.address')}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    4415 Glenwood Rd<br />
                    Brooklyn, NY 11203
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-md p-3 mt-4">
                    <Car className="h-4 w-4" />
                    <span className="font-medium">{t('location.entrance')}</span>
                  </div>
                </div>

                <Link
                  href={"https://maps.google.com/?q=4415+Glenwood+Rd,+Brooklyn,+NY+11203" as any}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  {t('location.directions')}
                </Link>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('location.mapPlaceholder')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Schedule */}
      <section className="py-16 bg-muted/30">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            {t('schedule.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Morning Service */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                {t('schedule.morning.title')}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('schedule.morning.sunSchool')}</p>
                    <p className="text-sm text-muted-foreground">8:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('schedule.morning.worship')}</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 11:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('schedule.language')}</p>
                    <p className="text-sm text-muted-foreground">{t('schedule.morning.language')}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => generateICS('morning')}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                {t('schedule.addToCalendar')}
              </button>
            </div>

            {/* Youth/Afternoon Service */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                {t('schedule.youth.title')}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('schedule.youth.service')}</p>
                    <p className="text-sm text-muted-foreground">12:30 PM - 2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('schedule.language')}</p>
                    <p className="text-sm text-muted-foreground">{t('schedule.youth.language')}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => generateICS('youth')}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                {t('schedule.addToCalendar')}
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* What to Expect */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
            <Info className="h-8 w-8 text-primary" />
            {t('expect.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dress Code */}
            <div className="text-center p-6 bg-card border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                {t('expect.dress.title')}
              </h3>
              <p className="text-muted-foreground mb-2">
                {t('expect.dress.description')}
              </p>
              <p className="text-sm text-primary font-medium">
                {t('expect.dress.leaders')}
              </p>
            </div>

            {/* Accessibility */}
            <div className="text-center p-6 bg-card border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Accessibility className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                {t('expect.accessibility.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('expect.accessibility.description')}
              </p>
            </div>

            {/* Translation */}
            <div className="text-center p-6 bg-card border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Languages className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                {t('expect.translation.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('expect.translation.description')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('contact.description')}
            </p>
            <Link
              href={"/contact" as any}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              <Users className="h-5 w-5" />
              {t('contact.button')}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
