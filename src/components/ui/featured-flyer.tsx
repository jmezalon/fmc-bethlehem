'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight, X, Sparkles } from 'lucide-react';

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
    fetch('/api/flyers/featured', { cache: 'no-store' })
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
    <div className="flyer-enter">
    <section
      aria-label="Featured event"
      className="relative isolate overflow-hidden bg-[#3d0a23]"
    >
      {/* Layered brand gradient — deep maroon → maroon → warm brown */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, #3d0a23 0%, #5a1336 28%, #8a1f4f 60%, #713a24 100%)',
        }}
      />

      {/* Soft warm glows in flame-orange / flame-yellow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[640px] h-[480px] bg-[#e4a166]/25 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 right-[-10%] w-[700px] h-[480px] bg-[#f0c66d]/15 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -translate-y-1/2 left-[-15%] w-[420px] h-[420px] bg-[#8a1f4f]/40 blur-[120px] rounded-full" />
      </div>

      {/* Subtle dot texture for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

          {/* Flyer image — portrait on mobile (matches typical 4:5 portrait flyers) */}
          <div className="lg:hidden relative mx-auto flyer-image-in" style={{ width: '100%', maxWidth: 400 }}>
            {/* Warm halo behind image */}
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#e4a166] via-[#f0c66d] to-[#e4a166] blur-2xl flyer-halo" />
            <div
              className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/40 bg-[#3d0a23]"
              style={{ aspectRatio: '4/5' }}
            >
              {flyer.portraitImage ? (
                <Image
                  src={flyer.portraitImage}
                  alt={flyer.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 400px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#5a1336] flex items-center justify-center">
                  <span className="text-[#f0c66d]/70 text-sm">Flyer image</span>
                </div>
              )}
            </div>
          </div>

          {/* Flyer image — landscape on desktop. 16:9 to match natural flyer aspect, nothing cropped. */}
          <div className="hidden lg:block relative flex-shrink-0 w-[600px] xl:w-[720px] 2xl:w-[760px] flyer-image-in">
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#e4a166] via-[#f0c66d] to-[#e4a166] blur-2xl flyer-halo" />
            <div
              className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/40 bg-[#3d0a23]"
              style={{ aspectRatio: '16/9' }}
            >
              {flyer.landscapeImage ? (
                <Image
                  src={flyer.landscapeImage}
                  alt={flyer.title}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1536px) 760px, (min-width: 1280px) 720px, 600px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#5a1336] flex items-center justify-center">
                  <span className="text-[#f0c66d]/70 text-sm">Flyer image</span>
                </div>
              )}
            </div>
          </div>

          {/* Event details */}
          <div className="flex-1 text-center lg:text-left text-white flyer-content-stagger">
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#e4a166]/15 border border-[#e4a166]/40 text-[#f0c66d] text-[11px] font-semibold uppercase tracking-[0.22em]">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Event
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-[1.05] tracking-tight bg-gradient-to-br from-white via-white to-[#f0c66d]/90 bg-clip-text text-transparent">
              {flyer.title}
            </h2>

            {flyer.subtitle && (
              <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {flyer.subtitle}
              </p>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-9 max-w-2xl mx-auto lg:mx-0">
              {dateRange && (
                <li className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <Calendar className="h-5 w-5 text-[#f0c66d] flex-shrink-0" />
                  <span className="text-white/95 text-sm font-medium text-left">{dateRange}</span>
                </li>
              )}
              {flyer.time && (
                <li className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <Clock className="h-5 w-5 text-[#f0c66d] flex-shrink-0" />
                  <span className="text-white/95 text-sm font-medium text-left">{flyer.time}</span>
                </li>
              )}
              {flyer.location && (
                <li className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <MapPin className="h-5 w-5 text-[#f0c66d] flex-shrink-0" />
                  <span className="text-white/95 text-sm font-medium text-left line-clamp-2">{flyer.location}</span>
                </li>
              )}
            </ul>

            <Link
              href={flyer.linkUrl as any}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#e4a166] to-[#f0c66d] text-[#4a0e2c] font-bold text-base shadow-xl shadow-[#e4a166]/30 hover:shadow-2xl hover:shadow-[#e4a166]/40 hover:scale-[1.02] transition-all duration-200"
            >
              Learn More
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e4a166]/60 to-transparent" />

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss featured event"
        className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm border border-white/10 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </section>
    </div>
  );
}
