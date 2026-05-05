import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { saveSubmission, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Prepare submission data
    const submissionId = Date.now().toString();
    const name = data.name || `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim();

    const submission = {
      id: submissionId,
      type: 'venue-booking',
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
      console.log('Venue booking submission saved to database:', submissionId);
    } catch (dbError) {
      console.error('Database save failed, continuing with email only:', dbError);
    }

    // Send email notification to admin
    try {
      const requestedServices = [
        data.audioVisual && 'Audio/Visual',
        data.catering && 'Catering',
        data.decorations && 'Decorations',
        data.parking && 'Parking',
        data.security && 'Security',
      ].filter(Boolean) as string[];

      const emailTemplate = emailTemplates.formSubmission(
        'Venue Booking Request',
        name,
        data.email,
        data.phone,
        [
          ['Organization', data.organization],
          ['Event type', data.eventType],
          ['Event title', data.eventTitle],
          ['Event description', data.eventDescription],
          ['Expected attendees', data.expectedAttendees],
          ['Preferred date', data.preferredDate],
          ['Alternate date', data.alternateDate],
          ['Start time', data.startTime],
          ['End time', data.endTime],
          ['Setup time', data.setupTime],
          ['Requested services', requestedServices],
          ['Special requirements', data.specialRequirements],
          ['Previous events', data.previousEvents],
          ['Budget', data.budget],
        ]
      );

      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'methodistchurch1993@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('Venue booking submitted and email sent:', submissionId);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Venue booking request submitted successfully',
      id: submissionId,
    });

  } catch (error) {
    console.error('Error processing venue booking:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit venue booking request'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Venue booking endpoint - POST only' },
    { status: 405 }
  );
}
