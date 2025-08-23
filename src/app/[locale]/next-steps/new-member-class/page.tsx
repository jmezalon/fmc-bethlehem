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
import { ArrowLeft, GraduationCap, Loader2 } from 'lucide-react';

const newMemberClassSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Please select your age range'),
  membershipStatus: z.string().min(1, 'Please select your membership status'),
  attendanceDuration: z
    .string()
    .min(1, 'Please select how long you have been attending'),
  classPreference: z.string().min(1, 'Please select your class preference'),
  sessionPreference: z.string().min(1, 'Please select your session preference'),
  childcare: z.string().min(1, 'Please indicate if you need childcare'),
  childrenAges: z.string().optional(),
  expectations: z
    .string()
    .min(10, 'Please share your expectations (at least 10 characters)'),
  questions: z.string().optional(),
  specialNeeds: z.string().optional(),
});

type NewMemberClassFormData = z.infer<typeof newMemberClassSchema>;

export default function NewMemberClassPage() {
  const t = useTranslations('nextSteps.newMemberClass');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewMemberClassFormData>({
    resolver: zodResolver(newMemberClassSchema),
  });

  const onSubmit = async (data: NewMemberClassFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions/new-member-class', {
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

  const membershipStatusOptions = [
    { value: 'visitor', label: t('form.membershipStatusOptions.visitor') },
    {
      value: 'regular-attendee',
      label: t('form.membershipStatusOptions.regularAttendee'),
    },
    { value: 'new-member', label: t('form.membershipStatusOptions.newMember') },
    {
      value: 'considering-membership',
      label: t('form.membershipStatusOptions.consideringMembership'),
    },
  ];

  const attendanceDurationOptions = [
    {
      value: 'less-than-month',
      label: t('form.attendanceDurationOptions.lessThanMonth'),
    },
    {
      value: '1-3-months',
      label: t('form.attendanceDurationOptions.1to3months'),
    },
    {
      value: '3-6-months',
      label: t('form.attendanceDurationOptions.3to6months'),
    },
    {
      value: '6-12-months',
      label: t('form.attendanceDurationOptions.6to12months'),
    },
    { value: 'over-year', label: t('form.attendanceDurationOptions.overYear') },
  ];

  const classPreferenceOptions = [
    { value: 'in-person', label: t('form.classPreferenceOptions.inPerson') },
    { value: 'online', label: t('form.classPreferenceOptions.online') },
    { value: 'hybrid', label: t('form.classPreferenceOptions.hybrid') },
  ];

  const sessionPreferenceOptions = [
    {
      value: 'sunday-morning',
      label: t('form.sessionPreferenceOptions.sundayMorning'),
    },
    {
      value: 'sunday-afternoon',
      label: t('form.sessionPreferenceOptions.sundayAfternoon'),
    },
    {
      value: 'weekday-evening',
      label: t('form.sessionPreferenceOptions.weekdayEvening'),
    },
    {
      value: 'saturday-morning',
      label: t('form.sessionPreferenceOptions.saturdayMorning'),
    },
  ];

  const childcareOptions = [
    { value: 'yes', label: t('form.childcareOptions.yes') },
    { value: 'no', label: t('form.childcareOptions.no') },
  ];

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-12">
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
            <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
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

                {/* Church Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.churchInfo')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label={t('form.membershipStatus')}
                      required
                      options={membershipStatusOptions}
                      placeholder={t('form.selectMembershipStatus')}
                      {...register('membershipStatus')}
                      error={errors.membershipStatus?.message}
                    />
                    <SelectField
                      label={t('form.attendanceDuration')}
                      required
                      options={attendanceDurationOptions}
                      placeholder={t('form.selectAttendanceDuration')}
                      {...register('attendanceDuration')}
                      error={errors.attendanceDuration?.message}
                    />
                  </div>
                </div>

                {/* Class Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.classPreferences')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label={t('form.classPreference')}
                      required
                      options={classPreferenceOptions}
                      placeholder={t('form.selectClassPreference')}
                      {...register('classPreference')}
                      error={errors.classPreference?.message}
                    />
                    <SelectField
                      label={t('form.sessionPreference')}
                      required
                      options={sessionPreferenceOptions}
                      placeholder={t('form.selectSessionPreference')}
                      {...register('sessionPreference')}
                      error={errors.sessionPreference?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label={t('form.childcare')}
                      required
                      options={childcareOptions}
                      placeholder={t('form.selectChildcare')}
                      {...register('childcare')}
                      error={errors.childcare?.message}
                    />
                    <FormField
                      label={t('form.childrenAges')}
                      placeholder={t('form.childrenAgesPlaceholder')}
                      {...register('childrenAges')}
                      error={errors.childrenAges?.message}
                    />
                  </div>
                </div>

                {/* Expectations & Questions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {t('form.expectationsQuestions')}
                  </h3>

                  <TextareaField
                    label={t('form.expectations')}
                    required
                    placeholder={t('form.expectationsPlaceholder')}
                    rows={4}
                    {...register('expectations')}
                    error={errors.expectations?.message}
                  />

                  <TextareaField
                    label={t('form.questions')}
                    placeholder={t('form.questionsPlaceholder')}
                    rows={3}
                    {...register('questions')}
                    error={errors.questions?.message}
                  />

                  <TextareaField
                    label={t('form.specialNeeds')}
                    placeholder={t('form.specialNeedsPlaceholder')}
                    rows={3}
                    {...register('specialNeeds')}
                    error={errors.specialNeeds?.message}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
