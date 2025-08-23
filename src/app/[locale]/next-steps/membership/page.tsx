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
import { ArrowLeft, Users, Loader2 } from 'lucide-react';

const membershipSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  maritalStatus: z.string().min(1, 'Please select your marital status'),
  salvationDate: z.string().optional(),
  baptismDate: z.string().optional(),
  previousChurch: z.string().optional(),
  membershipReason: z
    .string()
    .min(
      10,
      'Please explain why you want to become a member (at least 10 characters)'
    ),
  ministryInterests: z.array(z.string()).optional(),
  skills: z.string().optional(),
  availability: z.string().optional(),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

export default function MembershipPage() {
  const t = useTranslations('nextSteps.membership');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
  });

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions/membership', {
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

  const maritalStatusOptions = [
    { value: 'single', label: t('form.maritalStatusOptions.single') },
    { value: 'married', label: t('form.maritalStatusOptions.married') },
    { value: 'divorced', label: t('form.maritalStatusOptions.divorced') },
    { value: 'widowed', label: t('form.maritalStatusOptions.widowed') },
  ];

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-12">
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
            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
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

                  <FormField
                    label={t('form.address')}
                    required
                    {...register('address')}
                    error={errors.address?.message}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      label={t('form.city')}
                      required
                      {...register('city')}
                      error={errors.city?.message}
                    />
                    <FormField
                      label={t('form.state')}
                      required
                      {...register('state')}
                      error={errors.state?.message}
                    />
                    <FormField
                      label={t('form.zipCode')}
                      required
                      {...register('zipCode')}
                      error={errors.zipCode?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label={t('form.dateOfBirth')}
                      type="date"
                      required
                      {...register('dateOfBirth')}
                      error={errors.dateOfBirth?.message}
                    />
                    <SelectField
                      label={t('form.maritalStatus')}
                      required
                      options={maritalStatusOptions}
                      placeholder={t('form.selectMaritalStatus')}
                      {...register('maritalStatus')}
                      error={errors.maritalStatus?.message}
                    />
                  </div>
                </div>

                {/* Spiritual Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.spiritualInfo')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label={t('form.salvationDate')}
                      type="date"
                      {...register('salvationDate')}
                      error={errors.salvationDate?.message}
                    />
                    <FormField
                      label={t('form.baptismDate')}
                      type="date"
                      {...register('baptismDate')}
                      error={errors.baptismDate?.message}
                    />
                  </div>

                  <FormField
                    label={t('form.previousChurch')}
                    {...register('previousChurch')}
                    error={errors.previousChurch?.message}
                  />

                  <TextareaField
                    label={t('form.membershipReason')}
                    required
                    placeholder={t('form.membershipReasonPlaceholder')}
                    rows={4}
                    {...register('membershipReason')}
                    error={errors.membershipReason?.message}
                  />
                </div>

                {/* Ministry & Service */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.ministryService')}
                  </h3>

                  <TextareaField
                    label={t('form.skills')}
                    placeholder={t('form.skillsPlaceholder')}
                    rows={3}
                    {...register('skills')}
                    error={errors.skills?.message}
                  />

                  <TextareaField
                    label={t('form.availability')}
                    placeholder={t('form.availabilityPlaceholder')}
                    rows={3}
                    {...register('availability')}
                    error={errors.availability?.message}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
