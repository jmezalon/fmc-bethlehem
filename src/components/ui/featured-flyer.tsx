'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight, X } from 'lucide-react';

interface FeaturedFlyer {
  active: boolean;
  title: string;
  subtitle: string;
  portraitImage: string;
  landscapeImage: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  linkUrl: string;
}

function formatDateRange(startDate: string, endDate: string): string {
  if (!startDate) return '';
  const start = new Date(startDate + 'T00:00:00');
  const end = endDate ? new Date(endDate + 'T00:00:00') : null;
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  if (!end || startDate === endDate) {
    return start.toLocaleDateString('en-US', { ...opts, year: 'numeric' });
  }
  if (start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString('en-US', opts)} – ${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
}

export function FeaturedFlyer() {
  const [flyer, setFlyer] = useState<FeaturedFlyer | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const key = 'featured-flyer-dismissed';
    if (sessionStorage.getItem(key) === 'true') {
      setDismissed(true);
      return;
    }
    fetch('/api/flyers/featured')
      .then(r => r.json())
      .then(data => {
        if (data.active) setFlyer(data);
      })
      .catch(() => {});
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('featured-flyer-dismissed', 'true');
    setDismissed(true);
  };

  if (!flyer || dismissed) return null;

  const dateRange = formatDateRange(flyer.startDate, flyer.endDate);

  return (
    <section className="relative bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Flyer image — portrait on mobile, landscape on desktop */}
          <div className="w-full lg:hidden relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/60 flex-shrink-0"
               style={{ aspectRatio: '9/11', maxWidth: 360, margin: '0 auto' }}>
            {flyer.portraitImage ? (
              <Image
                src={flyer.portraitImage}
                alt={flyer.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 360px"
                priority
              />
            ) : (
              <div className="w-full h-full bg-purple-800/40 flex items-center justify-center">
                <span className="text-purple-300 text-sm">Flyer image</span>
              </div>
            )}
          </div>

          <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/60 flex-shrink-0"
               style={{ width: 560, aspectRatio: '16/7' }}>
            {flyer.landscapeImage ? (
              <Image
                src={flyer.landscapeImage}
                alt={flyer.title}
                fill
                className="object-cover"
                sizes="560px"
                priority
              />
            ) : (
              <div className="w-full h-full bg-purple-800/40 flex items-center justify-center">
                <span className="text-purple-300 text-sm">Flyer image</span>
              </div>
            )}
          </div>

          {/* Event details */}
          <div className="flex-1 text-center lg:text-left text-white">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-semibold uppercase tracking-widest">
              Featured Event
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">
              {flyer.title}
            </h2>
            {flyer.subtitle && (
              <p className="text-purple-200 text-base sm:text-lg mb-6 leading-snug">
                {flyer.subtitle}
              </p>
            )}

            <ul className="space-y-3 mb-8 text-sm sm:text-base">
              {dateRange && (
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <Calendar className="h-5 w-5 text-purple-300 flex-shrink-0" />
                  <span className="text-white/90">{dateRange}</span>
                </li>
              )}
              {flyer.time && (
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <Clock className="h-5 w-5 text-purple-300 flex-shrink-0" />
                  <span className="text-white/90">{flyer.time}</span>
                </li>
              )}
              {flyer.location && (
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <MapPin className="h-5 w-5 text-purple-300 flex-shrink-0" />
                  <span className="text-white/90">{flyer.location}</span>
                </li>
              )}
            </ul>

            <Link
              href={flyer.linkUrl as any}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-purple-900 font-bold text-sm hover:bg-purple-50 transition-colors shadow-lg"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss featured event"
        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </section>
  );
}
