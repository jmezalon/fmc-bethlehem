import { NextRequest, NextResponse } from 'next/server';
import { getAllEvents, createEvent, initDatabase } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await initDatabase();
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const body = await request.json();
    
    // Validate required fields
    if (!body.title?.en || !body.date || !body.time || !body.location?.en || !body.description?.en || !body.category?.en) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create multi-language object with fallbacks
    const createMultiLangText = (text: any) => ({
      en: text.en || '',
      es: text.es || text.en || '',
      fr: text.fr || text.en || '',
      ht: text.ht || text.en || ''
    });

    const event = {
      id: uuidv4(),
      title: createMultiLangText(body.title),
      date: body.date,
      time: body.time,
      location: createMultiLangText(body.location),
      description: createMultiLangText(body.description),
      category: createMultiLangText(body.category),
      image: body.image || null
    };

    await createEvent(event);
    return NextResponse.json({ message: 'Event created successfully', id: event.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
