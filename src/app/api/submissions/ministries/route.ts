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
      type: 'ministries',
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
      console.log('Ministries submission saved to database:', submissionId);
    } catch (dbError) {
      console.error('Database save failed, continuing with email only:', dbError);
    }

    // Send email notification to admin
    try {
      const emailTemplate = emailTemplates.formSubmission(
        'Ministry Interest',
        name,
        data.email,
        data.phone,
        [
          ['Age range', data.age],
          ['Primary ministry', data.primaryMinistry],
          ['Secondary ministries', data.secondaryMinistries],
          ['Experience', data.experience],
          ['Skills', data.skills],
          ['Availability', data.availability],
          ['Time commitment', data.timeCommitment],
          ['Motivation', data.motivation],
          ['Background check consent', data.backgroundCheck],
          ['Additional info', data.additionalInfo],
        ]
      );

      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'methodistchurch1993@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('Ministries form submitted and email sent:', submissionId);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submissionId,
    });
  } catch (error) {
    console.error('Error processing ministries form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
