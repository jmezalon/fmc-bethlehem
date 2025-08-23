'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { MobileNav } from '@/components/ui/mobile-nav';
import Link from 'next/link';
import { Heart, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const t = useTranslations('nav');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'planVisit', href: '/plan-visit' },
    { key: 'watch', href: '/watch' },
    { key: 'events', href: '/events' },
    { key: 'nextSteps', href: '/next-steps' },
    { key: 'prayer', href: '/prayer' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <Link href={"/" as any} className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                FMC
              </span>
            </div>
            <span className="font-bold text-lg text-foreground">Bethlehem</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map(item => (
              <Link
                key={item.key}
                href={item.href as any}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center space-x-4">
            {/* Give Button */}
            <Link
              href="/give"
              className="hidden sm:inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              <Heart className="h-4 w-4" />
              {t('give')}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
