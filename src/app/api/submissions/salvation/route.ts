import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { saveSubmission, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Prepare submission data
    const submissionId = Date.now().toString();
    const name = `${data.firstName} ${data.lastName}`;

    const submission = {
      id: submissionId,
      type: 'salvation',
      name,
      email: data.email,
      phone: data.phone,
      data: {
        ...data,
        submittedAt: new Date().toISOString(),
      }
    };

    // Try to save to database, but don't fail if database is not available
    try {
      await initDatabase();
      await saveSubmission(submission);
      console.log('Salvation submission saved to database:', submissionId);
    } catch (dbError) {
      console.error('Database save failed, continuing with email only:', dbError);
    }

    // Send email notification to admin
    try {
      const emailTemplate = emailTemplates.formSubmission(
        'Salvation Decision',
        name,
        data.email,
        data.phone,
        [
          ['Age range', data.age],
          ['Decision date', data.decisionDate],
          ['Testimony', data.testimony],
          ['Prayer requests', data.prayerRequests],
          ['Follow-up preference', data.followUpPreference],
          ['Additional comments', data.additionalComments],
        ]
      );

      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'methodistchurch1993@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('Salvation form submitted and email sent:', submissionId);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submissionId,
    });
  } catch (error) {
    console.error('Error processing salvation form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
