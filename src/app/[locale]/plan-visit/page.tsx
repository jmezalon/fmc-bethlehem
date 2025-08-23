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
      title = 'FMCB - Morning Worship Service';
      description =
        'Sunday School: 8:00 AM\\nWorship Service: 9:00-11:30 AM\\nLanguage: Haitian Creole';
    } else {
      startTime = new Date(nextSunday);
      startTime.setHours(12, 30, 0, 0);
      endTime = new Date(nextSunday);
      endTime.setHours(14, 30, 0, 0);
      title = 'FMCB - Youth/Afternoon Service';
      description =
        'Youth and Afternoon Service\\nLanguages: English & Haitian Creole';
    }

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FMCB//Church Service//EN',
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
                    4415 Glenwood Rd
                    <br />
                    Brooklyn, NY 11203
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-md p-3 mt-4">
                    <Car className="h-4 w-4" />
                    <span className="font-medium">
                      {t('location.entrance')}
                    </span>
                  </div>
                </div>

                <Link
                  href={
                    'https://maps.google.com/?q=4415+Glenwood+Rd,+Brooklyn,+NY+11203' as any
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  {t('location.directions')}
                </Link>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-lg overflow-hidden h-80 border border-border">
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=320&amp;hl=en&amp;q=4415%20Glenwood%20Rd,%20Brooklyn,%20NY%2011203+(Free%20Methodist%20Church%20of%20Bethlehem)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Free Methodist Church of Bethlehem Location"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 bg-muted/30">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Weekly Schedule
          </h2>

          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Sunday Services */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Sunday Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">First Service</p>
                      <p className="text-sm text-muted-foreground">Sunday School: 8:00 AM</p>
                      <p className="text-sm text-muted-foreground">Worship: 9:00 - 11:30 AM</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">Second Service</p>
                      <p className="text-sm text-muted-foreground">Worship: 12:30 - 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-md">
                <p className="text-sm text-primary font-medium">
                  First Sunday of each month: Special Lord's Communion Sunday for Baptised Members
                </p>
              </div>
            </div>

            {/* Monday */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Monday
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">Kase Chenn</p>
                    <p className="text-sm text-muted-foreground">Fasting & Prayer</p>
                    <p className="text-sm text-muted-foreground">8:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">Youth Bible Study</p>
                    <p className="text-sm text-muted-foreground">5:30 - 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">General Bible Study</p>
                    <p className="text-sm text-muted-foreground">7:15 - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tuesday - Friday */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Tuesday - Friday
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-full">
                  <p className="font-medium">Multi-Day Prayer (Zoom)</p>
                  <p className="text-sm text-muted-foreground">11:30 AM - 12:15 PM</p>
                  <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                    <p className="font-medium text-blue-800 mb-2">Zoom Details:</p>
                    <p className="text-blue-700">Meeting ID: 457 357 0961</p>
                    <p className="text-blue-700 mb-3">Passcode: a5ia6i</p>
                    <a
                      href="https://zoom.us/j/4573570961?pwd=a5ia6i"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.777 4.43a1.5 1.5 0 0 0-1.061-.44H5.284a1.5 1.5 0 0 0-1.061.44 1.5 1.5 0 0 0-.44 1.061v12.018a1.5 1.5 0 0 0 .44 1.061 1.5 1.5 0 0 0 1.061.44h13.432a1.5 1.5 0 0 0 1.061-.44 1.5 1.5 0 0 0 .44-1.061V5.491a1.5 1.5 0 0 0-.44-1.061zM8.5 15.5v-7l5.5 3.5-5.5 3.5z"/>
                      </svg>
                      Join Zoom Meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Wednesday */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Wednesday
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="font-medium">Mercredi de Combat Spirituel</p>
                  <p className="text-sm text-muted-foreground">Prayer Service</p>
                  <p className="text-sm text-muted-foreground">7:00 - 9:30 PM</p>
                </div>
              </div>
            </div>

            {/* Saturday */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Saturday
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="font-medium">Fasting & Prayer</p>
                  <p className="text-sm text-muted-foreground">8:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>

            {/* Special Events */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Special Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">Watch Night</p>
                      <p className="text-sm text-muted-foreground">Last Friday of each month</p>
                      <p className="text-sm text-muted-foreground">8:00 PM - 12:00 AM</p>
                      </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">Marriage Ministry</p>
                      <p className="text-sm text-muted-foreground">Last Saturday of each month</p>
                      <p className="text-sm text-muted-foreground">6:30 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Download Buttons */}
          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => generateICS('morning')}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Add Sunday Services to Calendar
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
              href={'/contact' as any}
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
