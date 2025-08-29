import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { saveSubmission, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email } = data;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Prepare submission data
    const submissionId = Date.now().toString();
    
    const submission = {
      id: submissionId,
      type: 'newsletter',
      name: 'Newsletter Subscriber',
      email: email,
      phone: undefined,
      data: {
        email,
        subscribedAt: new Date().toISOString(),
      }
    };

    // Try to save to database, but don't fail if database is not available
    try {
      await initDatabase();
      await saveSubmission(submission);
      console.log('Newsletter subscription saved to database:', submissionId);
    } catch (dbError) {
      console.error('Database save failed, continuing with email only:', dbError);
    }

    // Send confirmation email to subscriber
    try {
      const confirmationTemplate = emailTemplates.newsletterSubscription(email);
      
      await sendEmail({
        to: email,
        subject: confirmationTemplate.subject,
        html: confirmationTemplate.html,
        text: confirmationTemplate.text,
      });

      console.log('Newsletter confirmation sent to:', email);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Continue - subscription is still valid even if confirmation fails
    }

    // Send notification to church admin
    try {
      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'methodistchurch1993@gmail.com',
        subject: 'New Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
        `,
        text: `New Newsletter Subscription\n\nEmail: ${email}\nSubscribed: ${new Date().toLocaleString()}`,
      });

      console.log('Newsletter subscription notification sent to admin');
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      id: submissionId,
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
