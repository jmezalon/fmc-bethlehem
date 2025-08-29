import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { saveSubmission, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Initialize database tables if needed
    await initDatabase();

    // Prepare submission data
    const submissionId = Date.now().toString();
    const name = `${data.firstName} ${data.lastName}`;
    
    const submission = {
      id: submissionId,
      type: 'contact',
      name,
      email: data.email,
      phone: data.phone,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        subject: data.subject,
        message: data.message,
        submittedAt: new Date().toISOString(),
      }
    };

    // Save to database
    await saveSubmission(submission);

    // Send email notification using Resend
    try {
      console.log('Attempting to send email...');
      console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
      console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
      
      const emailTemplate = emailTemplates.contactForm(
        submission.name,
        submission.email,
        submission.phone || '',
        submission.data.subject,
        submission.data.message
      );

      const emailResult = await sendEmail({
        to: process.env.CONTACT_EMAIL || 'jmezalon@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('Email sent successfully:', emailResult);
      console.log('Contact form submitted and email sent:', submissionId);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      console.error('Email error details:', JSON.stringify(emailError, null, 2));
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      id: submissionId,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
