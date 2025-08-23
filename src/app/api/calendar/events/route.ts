import { NextRequest, NextResponse } from 'next/server';
import { generateEventsICS, convertEventToICS } from '@/lib/ics';
import eventsData from '@/../../data/events.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'en') as 'en' | 'fr' | 'ht';
    
    // Convert events to ICS format
    const icsEvents = eventsData.map(event => convertEventToICS(event, locale));
    
    // Generate ICS content
    const icsContent = generateEventsICS(icsEvents, 'FMC Bethlehem Events');
    
    // Return ICS file
    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="fmc-bethlehem-events.ics"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating events calendar:', error);
    return NextResponse.json(
      { error: 'Failed to generate calendar' },
      { status: 500 }
    );
  }
}
