export interface EventData {
  id: string;
  title: {
    en: string;
    ht: string;
    fr: string;
  };
  description: {
    en: string;
    ht: string;
    fr: string;
  };
  date: string;
  time: string;
  location: {
    en: string;
    ht: string;
    fr: string;
  };
  category: string;
}

export function generateICS(event: EventData, locale: 'en' | 'ht' | 'fr' = 'en'): string {
  const formatDate = (dateStr: string, timeStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    const [hours, minutes] = timeStr.split(':');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeText = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '');
  };

  const startDateTime = formatDate(event.date, event.time);
  // Assume 1 hour duration for events
  const endDate = new Date(event.date + 'T' + event.time);
  endDate.setHours(endDate.getHours() + 1);
  const endDateTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FMCB//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@fmcbethlehem.org`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDateTime}`,
    `DTEND:${endDateTime}`,
    `SUMMARY:${escapeText(event.title[locale])}`,
    `DESCRIPTION:${escapeText(event.description[locale])}`,
    `LOCATION:${escapeText(event.location[locale])}`,
    `CATEGORIES:${escapeText(event.category)}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

export function downloadICS(event: EventData, locale: 'en' | 'ht' | 'fr' = 'en'): void {
  const icsContent = generateICS(event, locale);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title[locale].replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
