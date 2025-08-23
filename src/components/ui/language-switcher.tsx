'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath as any);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLocale.name}</span>
        <span className="sm:hidden">{currentLocale.flag}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-20 min-w-[160px] rounded-md border bg-popover p-1 shadow-md">
            {locales.map(loc => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                  locale === loc.code && 'bg-accent text-accent-foreground'
                )}
              >
                <span className="text-base">{loc.flag}</span>
                <span>{loc.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
