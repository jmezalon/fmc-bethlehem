'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container } from '@/components/ui/container';
import { FormField } from '@/components/ui/form-field';
import { TextareaField } from '@/components/ui/textarea-field';
import { SuccessBanner } from '@/components/ui/success-banner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Users, Lock } from 'lucide-react';
import Link from 'next/link';

const prayerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  request: z
    .string()
    .min(10, 'Please share more details about your prayer request'),
  isPublic: z.boolean().default(false),
});

type PrayerFormData = z.infer<typeof prayerSchema>;

export default function PrayerPage() {
  const t = useTranslations('prayer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<PrayerFormData>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      isPublic: false,
    },
  });

  const isPublic = watch('isPublic');

  const onSubmit = async (data: PrayerFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error('Failed to submit prayer request');
      }
    } catch (error) {
      console.error('Error submitting prayer:', error);
      alert(
        'There was an error submitting your prayer request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Container className="py-16">
          <SuccessBanner
            title={t('success.title')}
            message={t('success.message')}
          />
          <div className="text-center mt-8">
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              {t('submitAnother')}
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Container className="py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Prayer Wall Link */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t('wall.title')}
                </h3>
                <p className="text-gray-600 text-sm">{t('wall.description')}</p>
              </div>
              <Link
                href={'/prayer/wall' as any}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {t('wall.visit')}
              </Link>
            </div>
          </div>

          {/* Prayer Form */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('form.title')}
                </h2>
                <p className="text-gray-600">{t('form.description')}</p>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {t('form.personalInfo')}
                </h3>

                <FormField
                  label={t('form.name')}
                  error={errors.name?.message}
                  required={false}
                  {...register('name')}
                  type="text"
                  placeholder={t('form.namePlaceholder')}
                />

                <FormField
                  label={t('form.email')}
                  error={errors.email?.message}
                  required
                  {...register('email')}
                  type="email"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              {/* Prayer Request */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {t('form.requestInfo')}
                </h3>

                <TextareaField
                  label={t('form.request')}
                  error={errors.request?.message}
                  required
                  {...register('request')}
                  rows={6}
                  placeholder={t('form.requestPlaceholder')}
                />
              </div>

              {/* Privacy Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {t('form.privacy')}
                </h3>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="isPublic"
                      checked={isPublic}
                      onCheckedChange={(checked: boolean) =>
                        setValue('isPublic', !!checked)
                      }
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="isPublic"
                        className="text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {t('form.makePublic')}
                      </label>
                      <p className="text-xs text-gray-600 mt-1">
                        {t('form.publicDescription')}
                      </p>
                    </div>
                  </div>

                  {!isPublic && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                      <Lock className="h-3 w-3" />
                      <span>{t('form.privateNote')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
