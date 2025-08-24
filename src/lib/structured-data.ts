interface Event {
  id: string;
  title: { en: string; ht: string; fr: string; es: string };
  description: { en: string; ht: string; fr: string; es: string };
  date: string;
  time: string;
  location: { en: string; ht: string; fr: string; es: string };
  image?: string;
  category: string;
}

interface Sermon {
  id: string;
  title: { en: string; ht: string; fr: string; es: string };
  description: { en: string; ht: string; fr: string; es: string };
  speaker: { en: string; ht: string; fr: string; es: string };
  date: string;
  duration: string;
  videoUrl?: string;
  audioUrl?: string;
  series?: { en: string; ht: string; fr: string; es: string };
  topics: string[];
  language: string;
}

export function generateEventJsonLd(event: Event, locale: 'en' | 'ht' | 'fr' | 'es') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title[locale],
    description: event.description[locale],
    startDate: `${event.date}T${event.time}:00`,
    location: {
      '@type': 'Place',
      name: 'Free Methodist Church Bethlehem',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4415 Glenwood Rd',
        addressLocality: 'Brooklyn',
        addressRegion: 'NY',
        postalCode: '11203',
        addressCountry: 'US',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Free Methodist Church Bethlehem',
      url: baseUrl,
    },
    ...(event.image && {
      image: event.image.startsWith('http')
        ? event.image
        : `${baseUrl}${event.image}`,
    }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateSermonJsonLd(
  sermon: Sermon,
  locale: 'en' | 'ht' | 'fr' | 'es'
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/watch/sermons/${sermon.id}`,
    headline: sermon.title[locale],
    description: sermon.description[locale],
    author: {
      '@type': 'Person',
      name: sermon.speaker[locale],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Free Methodist Church Bethlehem',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/api/og?title=FMC%20Bethlehem&type=sermon`,
      },
    },
    datePublished: sermon.date,
    dateModified: sermon.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/watch/sermons/${sermon.id}`,
    },
    ...(sermon.videoUrl && {
      video: {
        '@type': 'VideoObject',
        name: sermon.title[locale],
        description: sermon.description[locale],
        thumbnailUrl: `${baseUrl}/api/og?title=${encodeURIComponent(sermon.title[locale])}&type=sermon`,
        uploadDate: sermon.date,
        duration: sermon.duration,
        contentUrl: sermon.videoUrl,
      },
    }),
    ...(sermon.audioUrl && {
      audio: {
        '@type': 'AudioObject',
        name: sermon.title[locale],
        description: sermon.description[locale],
        duration: sermon.duration,
        contentUrl: sermon.audioUrl,
      },
    }),
    keywords: sermon.topics.join(', '),
    inLanguage: locale,
    ...(sermon.series && {
      isPartOf: {
        '@type': 'CreativeWorkSeries',
        name: sermon.series[locale],
      },
    }),
  };
}

export function generateOrganizationJsonLd(locale: 'en' | 'ht' | 'fr' | 'es') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Free Methodist Church Bethlehem',
    alternateName: 'FMCB',
    url: baseUrl,
    logo: `${baseUrl}/api/og?title=FMC%20Bethlehem`,
    description:
      'Free Methodist Church in Brooklyn, NY serving the community with worship, prayer, and Bible study.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4415 Glenwood Rd',
      addressLocality: 'Brooklyn',
      addressRegion: 'NY',
      postalCode: '11203',
      addressCountry: 'US',
    },
    telephone: '(929) 343-9393',
    email: 'methodistchurch1993@gmail.com',
    sameAs: [
      'https://www.youtube.com/@FMCBethlehem-Brooklyn',
      'https://www.facebook.com/fmcbethlehem.brooklyn',
      'https://www.instagram.com/fmcbethlehem.brooklyn',
    ],
    foundingDate: '1993',
    areaServed: {
      '@type': 'City',
      name: 'Brooklyn',
      containedInPlace: {
        '@type': 'State',
        name: 'New York',
      },
    },
  };
}

export function generateWebsiteJsonLd(locale: 'en' | 'ht' | 'fr' | 'es') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'FMCB',
    description: 'Free Methodist Church in Brooklyn, NY',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: locale,
  };
}
