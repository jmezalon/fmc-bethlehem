import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate unique ID for the booking
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const id = `venue-booking_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Prepare the booking data
    const bookingData = {
      id,
      type: 'venue-booking',
      ...data,
      submittedAt: new Date().toISOString(),
    };

    // Ensure submissions directory exists
    const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
    if (!existsSync(submissionsDir)) {
      await mkdir(submissionsDir, { recursive: true });
    }

    // Save to JSON file
    const filename = `${id}.json`;
    const filepath = path.join(submissionsDir, filename);
    
    await writeFile(filepath, JSON.stringify(bookingData, null, 2));

    // Send email notification (optional - you can implement this later)
    // await sendBookingNotification(bookingData);

    return NextResponse.json({
      success: true,
      message: 'Venue booking request submitted successfully',
      id: id,
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
