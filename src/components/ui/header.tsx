'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Container } from './container';
import { Menu, X, Heart } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { SkipLink } from './skip-link';
import { FocusTrap } from './focus-trap';

export function Header() {
  const t = useTranslations('nav');
  const tA11y = useTranslations('accessibility');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: t('navigation.home') },
    { href: '/events', label: t('navigation.events') },
    { href: '/groups', label: t('navigation.groups') },
    { href: '/next-steps', label: t('navigation.nextSteps') },
    { href: '/prayer', label: t('navigation.prayer') },
    { href: '/watch/sermons', label: t('navigation.sermons') },
    { href: '/about', label: t('navigation.about') },
    { href: '/contact', label: t('navigation.contact') },
  ];

  return (
    <>
      <SkipLink />
      <header 
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="banner"
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href={"/" as any} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
              <img 
                src="/logo.jpeg" 
                alt="Free Methodist Church of Bethlehem Logo" 
                className="h-10 w-10"
              />
              <span className="font-bold text-lg">FMCB</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {/* Give Button */}
              <Link
                href="/give"
                className="hidden sm:inline-flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary"
              >
                <Heart className="h-4 w-4" />
                <span>{t('give')}</span>
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? tA11y('closeMenu') : tA11y('openMenu')}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <FocusTrap isActive={isMobileMenuOpen}>
            <nav 
              id="mobile-menu"
              className="md:hidden border-t bg-background"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <Container>
                <div className="py-4 space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as any}
                      className="block px-3 py-2 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/give"
                    className="flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-base font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    <span>{t('give')}</span>
                  </Link>
                </div>
              </Container>
            </nav>
          </FocusTrap>
        )}
      </header>
    </>
  );
}
