export function generateOGImageUrl(params: {
  title: string;
  subtitle?: string;
  type?: 'page' | 'sermon' | 'event' | 'article';
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const searchParams = new URLSearchParams({
    title: params.title,
    ...(params.subtitle && { subtitle: params.subtitle }),
    ...(params.type && { type: params.type }),
  });
  
  return `${baseUrl}/api/og?${searchParams.toString()}`;
}

export function generatePageMetadata(params: {
  title: string;
  description: string;
  path: string;
  type?: 'page' | 'sermon' | 'event' | 'article';
  locale?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${baseUrl}${params.path}`;
  const ogImage = generateOGImageUrl({
    title: params.title,
    subtitle: params.description,
    type: params.type,
  });

  return {
    title: params.title,
    description: params.description,
    openGraph: {
      title: params.title,
      description: params.description,
      url: url,
      siteName: 'FMC Bethlehem',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: params.title,
        },
      ],
      locale: params.locale || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      images: [ogImage],
    },
  };
}
