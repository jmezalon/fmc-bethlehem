/**
 * ICS (iCalendar) helper library for generating calendar files
 * Supports events and service times for FMCB
 */

export interface ICSEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  url?: string;
  organizer?: {
    name: string;
    email: string;
  };
}

export interface ServiceTime {
  id: string;
  name: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "9:00"
  endTime: string; // "11:30"
  location?: string;
  description?: string;
}

/**
 * Formats a date for ICS format (YYYYMMDDTHHMMSSZ)
 */
function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Escapes text for ICS format
 */
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

/**
 * Generates ICS content for a single event
 */
export function generateEventICS(event: ICSEvent): string {
  const now = new Date();
  const uid = `${event.id}@fmcbethlehem.org`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FMCB//Church Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatICSDate(now)}`,
    `DTSTART:${formatICSDate(event.startDate)}`,
    `DTEND:${formatICSDate(event.endDate)}`,
    `SUMMARY:${escapeICSText(event.title)}`,
  ];

  if (event.description) {
    ics.push(`DESCRIPTION:${escapeICSText(event.description)}`);
  }

  if (event.location) {
    ics.push(`LOCATION:${escapeICSText(event.location)}`);
  }

  if (event.url) {
    ics.push(`URL:${event.url}`);
  }

  if (event.organizer) {
    ics.push(
      `ORGANIZER;CN=${escapeICSText(event.organizer.name)}:mailto:${event.organizer.email}`
    );
  }

  ics.push('STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT', 'END:VCALENDAR');

  return ics.join('\r\n');
}

/**
 * Generates ICS content for multiple events
 */
export function generateEventsICS(
  events: ICSEvent[],
  calendarName: string = 'FMCB Events'
): string {
  const now = new Date();

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FMCB//Church Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeICSText(calendarName)}`,
    'X-WR-TIMEZONE:America/New_York',
    'X-WR-CALDESC:Events and activities from FMCB',
  ];

  events.forEach(event => {
    const uid = `${event.id}@fmcbethlehem.org`;

    ics.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatICSDate(now)}`,
      `DTSTART:${formatICSDate(event.startDate)}`,
      `DTEND:${formatICSDate(event.endDate)}`,
      `SUMMARY:${escapeICSText(event.title)}`
    );

    if (event.description) {
      ics.push(`DESCRIPTION:${escapeICSText(event.description)}`);
    }

    if (event.location) {
      ics.push(`LOCATION:${escapeICSText(event.location)}`);
    }

    if (event.url) {
      ics.push(`URL:${event.url}`);
    }

    if (event.organizer) {
      ics.push(
        `ORGANIZER;CN=${escapeICSText(event.organizer.name)}:mailto:${event.organizer.email}`
      );
    }

    ics.push('STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT');
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

/**
 * Generates recurring ICS events for service times
 */
export function generateServiceTimesICS(serviceTimes: ServiceTime[]): string {
  const now = new Date();

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FMCB//Service Times//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:FMCB Service Times',
    'X-WR-TIMEZONE:America/New_York',
    'X-WR-CALDESC:Regular service times at FMCB',
  ];

  serviceTimes.forEach(service => {
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
      `DTSTAMP:${formatICSDate(now)}`,
      `DTSTART:${formatICSDate(startDateTime)}`,
      `DTEND:${formatICSDate(endDateTime)}`,
      `SUMMARY:${escapeICSText(service.name)}`,
      'RRULE:FREQ=WEEKLY;BYDAY=' +
        ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][service.dayOfWeek]
    );

    if (service.description) {
      ics.push(`DESCRIPTION:${escapeICSText(service.description)}`);
    }

    if (service.location) {
      ics.push(`LOCATION:${escapeICSText(service.location)}`);
    }

    ics.push('STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT');
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

/**
 * Downloads an ICS file to the user's device
 */
export function downloadICS(content: string, filename: string): void {
  if (typeof window === 'undefined') return;

  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.ics') ? filename : `${filename}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

/**
 * Converts event data from the events.json format to ICSEvent format
 */
export function convertEventToICS(
  event: any,
  locale: 'en' | 'fr' | 'ht' = 'en'
): ICSEvent {
  const startDate = new Date(event.date + 'T' + (event.time || '9:00'));
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2); // Default 2-hour duration

  return {
    id: event.id,
    title: event.title[locale],
    description: event.description[locale],
    location: event.location[locale],
    startDate,
    endDate,
    organizer: {
      name: 'FMCB',
      email: 'events@fmcbethlehem.org',
    },
  };
}

/**
 * Default service times for FMCB
 */
export const DEFAULT_SERVICE_TIMES: ServiceTime[] = [
  {
    id: 'sunday-worship',
    name: 'Sunday Worship Service',
    dayOfWeek: 0, // Sunday
    startTime: '9:00',
    endTime: '11:30',
    location: 'FMCB Sanctuary',
    description:
      'Join us for our weekly worship service with music, prayer, and biblical teaching.',
  },
  {
    id: 'monday-bible-study',
    name: 'Monday Bible Study',
    dayOfWeek: 1, // Monday
    startTime: '7:00',
    endTime: '9:30',
    location: 'FMCB Fellowship Hall',
    description: 'Weekly Bible study and discussion group.',
  },
  {
    id: 'wednesday-prayer',
    name: 'Wednesday Prayer Meeting',
    dayOfWeek: 3, // Wednesday
    startTime: '7:00',
    endTime: '9:00',
    location: 'FMCB Prayer Room',
    description: 'Prayer, spiritual warfare, and intercession.',
  },
];
