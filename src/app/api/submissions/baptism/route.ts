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
      type: 'baptism',
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
      console.log('Baptism submission saved to database:', submissionId);
    } catch (dbError) {
      console.error('Database save failed, continuing with email only:', dbError);
    }

    // Send email notification to admin
    try {
      const emailTemplate = emailTemplates.formSubmission(
        'Baptism',
        name,
        data.email,
        data.phone,
        [
          ['Age range', data.age],
          ['Salvation date', data.salvationDate],
          ['Previous baptism', data.previousBaptism],
          ['Reason for baptism', data.baptismReason],
          ['Preferred date', data.preferredDate],
          ['Special requests', data.specialRequests],
          ['Emergency contact', data.emergencyContact],
          ['Emergency contact phone', data.emergencyPhone],
        ]
      );

      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'methodistchurch1993@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('Baptism form submitted and email sent:', submissionId);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submissionId,
    });
  } catch (error) {
    console.error('Error processing baptism form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
