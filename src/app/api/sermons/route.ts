import { NextRequest, NextResponse } from 'next/server';
import { getAllSermons, createSermon, initDatabase } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await initDatabase();
    const sermons = await getAllSermons();
    return NextResponse.json(sermons);
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return NextResponse.json({ error: 'Failed to fetch sermons' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const body = await request.json();
    
    // Validate required fields
    if (!body.title?.en || !body.speaker?.en || !body.date || !body.duration || 
        !body.description?.en || !body.videoUrl || !body.thumbnail || !body.series?.en) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create multi-language object with fallbacks
    const createMultiLangText = (text: any) => ({
      en: text.en || '',
      es: text.es || text.en || '',
      fr: text.fr || text.en || '',
      ht: text.ht || text.en || ''
    });

    const sermon = {
      id: uuidv4(),
      title: createMultiLangText(body.title),
      speaker: createMultiLangText(body.speaker),
      date: body.date,
      duration: body.duration,
      description: createMultiLangText(body.description),
      videoUrl: body.videoUrl,
      thumbnail: body.thumbnail,
      series: createMultiLangText(body.series)
    };

    await createSermon(sermon);
    return NextResponse.json({ message: 'Sermon created successfully', id: sermon.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating sermon:', error);
    return NextResponse.json({ error: 'Failed to create sermon' }, { status: 500 });
  }
}
