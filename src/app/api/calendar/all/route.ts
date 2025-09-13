import { NextRequest, NextResponse } from 'next/server';
import {
  generateEventsICS,
  convertEventToICS,
  DEFAULT_SERVICE_TIMES,
  generateServiceTimesICS,
  ICSEvent,
} from '@/lib/ics';
import { getAllEvents } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'en') as 'en' | 'fr' | 'ht';

    // Get events from database
    const eventsData = await getAllEvents();

    // Convert events to ICS format
    const icsEvents = eventsData.map(event => convertEventToICS(event, locale));

    // Generate combined calendar with both events and service times
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FMCB//Complete Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:FMCB Complete Calendar',
      'X-WR-TIMEZONE:America/New_York',
      'X-WR-CALDESC:All events and service times from FMCB',
    ];

    const now = new Date();

    // Add events
    icsEvents.forEach(event => {
      const uid = `${event.id}@fmcbethlehem.org`;

      ics.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `DTSTART:${event.startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `DTEND:${event.endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `SUMMARY:${event.title.replace(/[\\;,\n\r]/g, match => '\\' + match)}`
      );

      if (event.description) {
        ics.push(
          `DESCRIPTION:${event.description.replace(/[\\;,\n\r]/g, match => '\\' + match)}`
        );
      }

      if (event.location) {
        ics.push(
          `LOCATION:${event.location.replace(/[\\;,\n\r]/g, match => '\\' + match)}`
        );
      }

      if (event.organizer) {
        ics.push(
          `ORGANIZER;CN=${event.organizer.name}:mailto:${event.organizer.email}`
        );
      }

      ics.push('STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT');
    });

    // Add service times
    DEFAULT_SERVICE_TIMES.forEach(service => {
      const uid = `service-${service.id}@fmcbethlehem.org`;

      // Calculate next occurrence of this day of week
      const today = new Date();
      const daysUntilService = (service.dayOfWeek - today.getDay() + 7) % 7;
      const nextServiceDate = new Date(today);
      nextServiceDate.setDate(today.getDate() + daysUntilService);

      // Parse start and end times
      const [startHour, startMinute] = service.startTime.split(':').map(Number);
      const [endHour, endMinute] = service.endTime.split(':').map(Number);

      const startDateTime = new Date(nextServiceDate);
      startDateTime.setHours(startHour, startMinute, 0, 0);

      const endDateTime = new Date(nextServiceDate);
      endDateTime.setHours(endHour, endMinute, 0, 0);

      ics.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `DTSTART:${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `DTEND:${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `SUMMARY:${service.name.replace(/[\\;,\n\r]/g, match => '\\' + match)}`,
        'RRULE:FREQ=WEEKLY;BYDAY=' +
          ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][service.dayOfWeek]
      );

      if (service.description) {
        ics.push(
          `DESCRIPTION:${service.description.replace(/[\\;,\n\r]/g, match => '\\' + match)}`
        );
      }

      if (service.location) {
        ics.push(
          `LOCATION:${service.location.replace(/[\\;,\n\r]/g, match => '\\' + match)}`
        );
      }

      ics.push('STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT');
    });

    ics.push('END:VCALENDAR');
    const icsContent = ics.join('\r\n');

    // Return ICS file
    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="fmc-bethlehem-complete.ics"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating complete calendar:', error);
    return NextResponse.json(
      { error: 'Failed to generate calendar' },
      { status: 500 }
    );
  }
}
