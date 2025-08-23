import { NextRequest, NextResponse } from 'next/server';
import { generateServiceTimesICS, DEFAULT_SERVICE_TIMES } from '@/lib/ics';

export async function GET(request: NextRequest) {
  try {
    // Generate ICS content for service times
    const icsContent = generateServiceTimesICS(DEFAULT_SERVICE_TIMES);

    // Return ICS file
    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="fmc-bethlehem-services.ics"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating services calendar:', error);
    return NextResponse.json(
      { error: 'Failed to generate calendar' },
      { status: 500 }
    );
  }
}
