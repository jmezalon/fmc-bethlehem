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
      type: 'new-member-class',
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
      console.log('New member class submission saved to database:', submissionId);
    } catch (dbError) {
      console.error('Database save failed, continuing with email only:', dbError);
    }

    // Send email notification to admin
    try {
      const emailTemplate = emailTemplates.formSubmission(
        'New Member Class',
        name,
        data.email,
        data.phone,
        [
          ['Age range', data.age],
          ['Membership status', data.membershipStatus],
          ['Attendance duration', data.attendanceDuration],
          ['Class preference', data.classPreference],
          ['Session preference', data.sessionPreference],
          ['Needs childcare', data.childcare],
          ['Children ages', data.childrenAges],
          ['Expectations', data.expectations],
          ['Questions', data.questions],
          ['Special needs', data.specialNeeds],
        ]
      );

      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'methodistchurch1993@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('New member class form submitted and email sent:', submissionId);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submissionId,
    });
  } catch (error) {
    console.error('Error processing new member class form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
