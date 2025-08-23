'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { FormField } from '@/components/ui/form-field';
import { TextareaField } from '@/components/ui/textarea-field';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {t('info.title')}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('info.address.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('info.address.street')}
                      <br />
                      {t('info.address.city')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('info.phone.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('info.phone.number')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('info.email.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('info.email.address')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('info.hours.title')}
                    </h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>{t('info.hours.sunday')}</p>
                      <p>{t('info.hours.wednesday')}</p>
                      <p>{t('info.hours.office')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {t('form.title')}
              </h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    {t('form.success.title')}
                  </h3>
                  <p className="text-green-700">{t('form.success.message')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label={t('form.firstName')}
                      name="firstName"
                      type="text"
                      required
                    />
                    <FormField
                      label={t('form.lastName')}
                      name="lastName"
                      type="text"
                      required
                    />
                  </div>

                  <FormField
                    label={t('form.email')}
                    name="email"
                    type="email"
                    required
                  />

                  <FormField label={t('form.phone')} name="phone" type="tel" />

                  <FormField
                    label={t('form.subject')}
                    name="subject"
                    type="text"
                    required
                  />

                  <TextareaField
                    label={t('form.message')}
                    name="message"
                    rows={5}
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t('form.send')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('map.title')}
            </h2>
            <p className="text-muted-foreground">{t('map.subtitle')}</p>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.8942857142857!2d-73.9284!3d40.6398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25c0f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2s4415%20Glenwood%20Rd%2C%20Brooklyn%2C%20NY%2011203!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Free Methodist Church of Bethlehem Location"
              className="w-full h-96"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
