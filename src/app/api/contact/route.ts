import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Add timestamp, ID, and format name
    const submission = {
      id: Date.now().toString(),
      type: 'contact',
      submittedAt: new Date().toISOString(),
      name: `${data.firstName} ${data.lastName}`,
      ...data,
    };

    // Ensure submissions directory exists
    const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
    if (!existsSync(submissionsDir)) {
      await mkdir(submissionsDir, { recursive: true });
    }

    // Save to JSON file
    const filename = `contact_${submission.id}.json`;
    const filepath = path.join(submissionsDir, filename);
    await writeFile(filepath, JSON.stringify(submission, null, 2));

    // Send email notification using Resend
    try {
      console.log('Attempting to send email...');
      console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
      console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
      
      const emailTemplate = emailTemplates.contactForm(
        submission.name,
        submission.email,
        submission.phone || '',
        submission.subject,
        submission.message
      );

      const emailResult = await sendEmail({
        to: process.env.CONTACT_EMAIL || 'jmezalon@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('Email sent successfully:', emailResult);
      console.log('Contact form submitted and email sent:', submission.id);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      console.error('Email error details:', JSON.stringify(emailError, null, 2));
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      id: submission.id,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
