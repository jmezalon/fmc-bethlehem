import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { StructuredData } from '@/components/structured-data';
import { generateOrganizationJsonLd, generateWebsiteJsonLd } from '@/lib/structured-data';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const locales = ['ht', 'fr', 'en'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = await getMessages();
  const seo = messages.seo as any;

  return {
    title: seo?.title || 'FMC Bethlehem',
    description:
      seo?.description || 'Welcome to FMC Bethlehem - Your community church',
    keywords: ['church', 'community', 'bethlehem', 'faith', 'worship'],
    authors: [{ name: 'FMC Bethlehem' }],
    creator: 'FMC Bethlehem',
    publisher: 'FMC Bethlehem',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fmc-bethlehem.com',
      siteName: seo?.title || 'FMC Bethlehem',
      title: seo?.title || 'FMC Bethlehem',
      description:
        seo?.description || 'Welcome to FMC Bethlehem - Your community church',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || 'FMC Bethlehem',
      description:
        seo?.description || 'Welcome to FMC Bethlehem - Your community church',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const structuredData = [
    generateOrganizationJsonLd(locale as 'en' | 'ht' | 'fr'),
    generateWebsiteJsonLd(locale as 'en' | 'ht' | 'fr'),
  ];

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <StructuredData data={structuredData} />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
