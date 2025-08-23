'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { X, Heart } from 'lucide-react';
import { useEffect } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ key: string; href: string }>;
}

export function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  const t = useTranslations('nav');

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background p-6 shadow-lg lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                FMC
              </span>
            </div>
            <span className="font-bold text-lg text-foreground">Bethlehem</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {navItems.map(item => (
            <Link
              key={item.key}
              href={item.href as any}
              onClick={onClose}
              className="block py-3 text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border last:border-b-0"
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Give Button in Mobile */}
          <Link
            href="/give"
            onClick={onClose}
            className="flex items-center gap-3 py-4 px-4 mt-6 rounded-md bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Heart className="h-5 w-5" />
            {t('give')}
          </Link>
        </nav>
      </div>
    </>
  );
}
