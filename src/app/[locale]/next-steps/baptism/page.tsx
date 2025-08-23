'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { FormField } from '@/components/ui/form-field';
import { TextareaField } from '@/components/ui/textarea-field';
import { SelectField } from '@/components/ui/select-field';
import { SuccessBanner } from '@/components/ui/success-banner';
import Link from 'next/link';
import { ArrowLeft, Heart, Loader2 } from 'lucide-react';

const baptismSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Please select your age range'),
  salvationDate: z.string().optional(),
  previousBaptism: z.string().min(1, 'Please select an option'),
  baptismReason: z
    .string()
    .min(
      10,
      'Please explain why you want to be baptized (at least 10 characters)'
    ),
  preferredDate: z.string().optional(),
  specialRequests: z.string().optional(),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  emergencyPhone: z.string().min(10, 'Emergency contact phone is required'),
});

type BaptismFormData = z.infer<typeof baptismSchema>;

export default function BaptismPage() {
  const t = useTranslations('nextSteps.baptism');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BaptismFormData>({
    resolver: zodResolver(baptismSchema),
  });

  const onSubmit = async (data: BaptismFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions/baptism', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccess(true);
        reset();
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ageOptions = [
    { value: 'under-18', label: t('form.ageOptions.under18') },
    { value: '18-25', label: t('form.ageOptions.18to25') },
    { value: '26-35', label: t('form.ageOptions.26to35') },
    { value: '36-50', label: t('form.ageOptions.36to50') },
    { value: '51-65', label: t('form.ageOptions.51to65') },
    { value: 'over-65', label: t('form.ageOptions.over65') },
  ];

  const previousBaptismOptions = [
    { value: 'no', label: t('form.previousBaptismOptions.no') },
    { value: 'yes-infant', label: t('form.previousBaptismOptions.yesInfant') },
    { value: 'yes-adult', label: t('form.previousBaptismOptions.yesAdult') },
  ];

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12">
        <Container>
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/next-steps"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToNextSteps')}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('title')}
              </h1>
              <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section className="py-12">
        <Container>
          <div className="max-w-2xl mx-auto">
            {showSuccess && (
              <SuccessBanner
                title={t('success.title')}
                message={t('success.message')}
                onClose={() => setShowSuccess(false)}
              />
            )}

            <div className="bg-card border rounded-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-card-foreground mb-2">
                  {t('form.title')}
                </h2>
                <p className="text-muted-foreground">{t('form.description')}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.personalInfo')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label={t('form.firstName')}
                      required
                      {...register('firstName')}
                      error={errors.firstName?.message}
                    />
                    <FormField
                      label={t('form.lastName')}
                      required
                      {...register('lastName')}
                      error={errors.lastName?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label={t('form.email')}
                      type="email"
                      required
                      {...register('email')}
                      error={errors.email?.message}
                    />
                    <FormField
                      label={t('form.phone')}
                      type="tel"
                      required
                      {...register('phone')}
                      error={errors.phone?.message}
                    />
                  </div>

                  <SelectField
                    label={t('form.age')}
                    required
                    options={ageOptions}
                    placeholder={t('form.selectAge')}
                    {...register('age')}
                    error={errors.age?.message}
                  />
                </div>

                {/* Baptism Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.baptismInfo')}
                  </h3>

                  <FormField
                    label={t('form.salvationDate')}
                    type="date"
                    {...register('salvationDate')}
                    error={errors.salvationDate?.message}
                  />

                  <SelectField
                    label={t('form.previousBaptism')}
                    required
                    options={previousBaptismOptions}
                    placeholder={t('form.selectPreviousBaptism')}
                    {...register('previousBaptism')}
                    error={errors.previousBaptism?.message}
                  />

                  <TextareaField
                    label={t('form.baptismReason')}
                    required
                    placeholder={t('form.baptismReasonPlaceholder')}
                    rows={4}
                    {...register('baptismReason')}
                    error={errors.baptismReason?.message}
                  />

                  <FormField
                    label={t('form.preferredDate')}
                    type="date"
                    {...register('preferredDate')}
                    error={errors.preferredDate?.message}
                  />

                  <TextareaField
                    label={t('form.specialRequests')}
                    placeholder={t('form.specialRequestsPlaceholder')}
                    rows={3}
                    {...register('specialRequests')}
                    error={errors.specialRequests?.message}
                  />
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.emergencyContact')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label={t('form.emergencyContactName')}
                      required
                      {...register('emergencyContact')}
                      error={errors.emergencyContact?.message}
                    />
                    <FormField
                      label={t('form.emergencyContactPhone')}
                      type="tel"
                      required
                      {...register('emergencyPhone')}
                      error={errors.emergencyPhone?.message}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('form.submitting')}
                      </>
                    ) : (
                      t('form.submit')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
