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
import { ArrowLeft, HandHeart, Loader2 } from 'lucide-react';

const ministriesSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Please select your age range'),
  primaryMinistry: z.string().min(1, 'Please select a primary ministry interest'),
  secondaryMinistries: z.array(z.string()).optional(),
  experience: z.string().optional(),
  skills: z.string().optional(),
  availability: z.string().min(1, 'Please select your availability'),
  timeCommitment: z.string().min(1, 'Please select your time commitment'),
  motivation: z.string().min(10, 'Please explain your motivation (at least 10 characters)'),
  backgroundCheck: z.boolean().refine(val => val === true, 'Background check consent is required'),
  additionalInfo: z.string().optional(),
});

type MinistriesFormData = z.infer<typeof ministriesSchema>;

export default function MinistriesPage() {
  const t = useTranslations('nextSteps.ministries');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MinistriesFormData>({
    resolver: zodResolver(ministriesSchema),
  });

  const onSubmit = async (data: MinistriesFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions/ministries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccess(true);
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const ministryOptions = [
    { value: 'worship', label: t('form.ministryOptions.worship') },
    { value: 'children', label: t('form.ministryOptions.children') },
    { value: 'youth', label: t('form.ministryOptions.youth') },
    { value: 'hospitality', label: t('form.ministryOptions.hospitality') },
    { value: 'outreach', label: t('form.ministryOptions.outreach') },
    { value: 'prayer', label: t('form.ministryOptions.prayer') },
    { value: 'media', label: t('form.ministryOptions.media') },
    { value: 'administration', label: t('form.ministryOptions.administration') },
    { value: 'maintenance', label: t('form.ministryOptions.maintenance') },
    { value: 'counseling', label: t('form.ministryOptions.counseling') },
  ];

  const availabilityOptions = [
    { value: 'sundays', label: t('form.availabilityOptions.sundays') },
    { value: 'weekdays', label: t('form.availabilityOptions.weekdays') },
    { value: 'evenings', label: t('form.availabilityOptions.evenings') },
    { value: 'weekends', label: t('form.availabilityOptions.weekends') },
    { value: 'flexible', label: t('form.availabilityOptions.flexible') },
  ];

  const timeCommitmentOptions = [
    { value: '1-2-hours', label: t('form.timeCommitmentOptions.1to2hours') },
    { value: '3-5-hours', label: t('form.timeCommitmentOptions.3to5hours') },
    { value: '6-10-hours', label: t('form.timeCommitmentOptions.6to10hours') },
    { value: '10-plus-hours', label: t('form.timeCommitmentOptions.10plusHours') },
  ];

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-12">
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
            <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
              <HandHeart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('title')}
              </h1>
              <p className="text-muted-foreground">
                {t('subtitle')}
              </p>
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
                <p className="text-muted-foreground">
                  {t('form.description')}
                </p>
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

                {/* Ministry Interests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.ministryInterests')}
                  </h3>

                  <SelectField
                    label={t('form.primaryMinistry')}
                    required
                    options={ministryOptions}
                    placeholder={t('form.selectPrimaryMinistry')}
                    {...register('primaryMinistry')}
                    error={errors.primaryMinistry?.message}
                  />

                  <TextareaField
                    label={t('form.experience')}
                    placeholder={t('form.experiencePlaceholder')}
                    rows={3}
                    {...register('experience')}
                    error={errors.experience?.message}
                  />

                  <TextareaField
                    label={t('form.skills')}
                    placeholder={t('form.skillsPlaceholder')}
                    rows={3}
                    {...register('skills')}
                    error={errors.skills?.message}
                  />
                </div>

                {/* Availability & Commitment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.availabilityCommitment')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label={t('form.availability')}
                      required
                      options={availabilityOptions}
                      placeholder={t('form.selectAvailability')}
                      {...register('availability')}
                      error={errors.availability?.message}
                    />
                    <SelectField
                      label={t('form.timeCommitment')}
                      required
                      options={timeCommitmentOptions}
                      placeholder={t('form.selectTimeCommitment')}
                      {...register('timeCommitment')}
                      error={errors.timeCommitment?.message}
                    />
                  </div>

                  <TextareaField
                    label={t('form.motivation')}
                    required
                    placeholder={t('form.motivationPlaceholder')}
                    rows={4}
                    {...register('motivation')}
                    error={errors.motivation?.message}
                  />
                </div>

                {/* Background Check & Additional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.additionalInfo')}
                  </h3>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="backgroundCheck"
                      {...register('backgroundCheck')}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="backgroundCheck" className="text-sm text-foreground">
                      {t('form.backgroundCheckConsent')}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                  </div>
                  {errors.backgroundCheck && (
                    <p className="text-sm text-red-500">{errors.backgroundCheck.message}</p>
                  )}

                  <TextareaField
                    label={t('form.additionalComments')}
                    placeholder={t('form.additionalCommentsPlaceholder')}
                    rows={3}
                    {...register('additionalInfo')}
                    error={errors.additionalInfo?.message}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
