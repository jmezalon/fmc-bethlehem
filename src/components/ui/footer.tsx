'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { MapPin, Mail, Youtube, Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const t = useTranslations('footer');
  const tService = useTranslations('serviceTimes');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement email signup logic
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      // Show success message
    }, 1000);
  };

  return (
    <footer className="bg-muted/50 border-t">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Church Info & Address */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    FMC
                  </span>
                </div>
                <span className="font-bold text-lg text-foreground">
                  Bethlehem
                </span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>123 Church Street</p>
                    <p>Bethlehem, PA 18015</p>
                    <p>United States</p>
                  </div>
                </div>

                <Link
                  href="https://maps.google.com/?q=123+Church+Street+Bethlehem+PA+18015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  {t('viewMap')}
                </Link>
              </div>
            </div>

            {/* Service Times */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {t('serviceTimes')}
              </h3>
              <div className="space-y-3 text-sm">
                {/* Sunday Worship */}
                <div>
                  <h4 className="font-medium text-foreground">
                    {tService('worship')}
                  </h4>
                  <p className="text-muted-foreground">{tService('sunday')}</p>
                  <p className="text-primary font-medium">
                    {tService('worshipTime')}
                  </p>
                </div>

                {/* Youth Service */}
                <div>
                  <h4 className="font-medium text-foreground">
                    {t('youthService')}
                  </h4>
                  <p className="text-muted-foreground">{tService('sunday')}</p>
                  <p className="text-primary font-medium">{t('youthTime')}</p>
                </div>

                {/* Prayer & Bible Study */}
                <div>
                  <h4 className="font-medium text-foreground">
                    {tService('prayer')}
                  </h4>
                  <p className="text-muted-foreground">{t('wednesday')}</p>
                  <p className="text-primary font-medium">
                    {tService('prayerTime')}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Signup */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {t('stayConnected')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('emailDescription')}
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className="flex-1 px-3 py-2 text-sm border border-input bg-background rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? '...' : t('subscribe')}
                  </button>
                </div>
              </form>
            </div>

            {/* Social Media & Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">{t('followUs')}</h3>

              <div className="flex space-x-4">
                <Link
                  href="https://youtube.com/@fmcbethlehem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>

                <Link
                  href="https://facebook.com/fmcbethlehem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>

                <Link
                  href="https://instagram.com/fmcbethlehem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>

              <div className="space-y-2 text-sm">
                <Link
                  href="mailto:info@fmcbethlehem.org"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@fmcbethlehem.org
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 FMC Bethlehem. {t('allRightsReserved')}</p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
