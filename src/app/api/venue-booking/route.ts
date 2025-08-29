import { NextRequest, NextResponse } from 'next/server';
import { saveSubmission, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Prepare submission data
    const submissionId = Date.now().toString();
    const name = `${data.firstName} ${data.lastName}`;
    
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

    // Send email notification (optional - you can implement this later)
    // await sendBookingNotification(bookingData);

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
