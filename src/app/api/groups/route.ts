import { NextRequest, NextResponse } from 'next/server';
import { getAllGroups, createGroup, initDatabase } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await initDatabase();
    const groups = await getAllGroups();
    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const body = await request.json();
    
    // Validate required fields
    if (!body.name?.en || !body.description?.en || !body.dayOfWeek || !body.time || 
        !body.language || !body.lifeStage || !body.location?.en || !body.contactEmail || 
        !body.leader?.en || body.capacity === undefined || body.currentMembers === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create multi-language object with fallbacks
    const createMultiLangText = (text: any) => ({
      en: text.en || '',
      es: text.es || text.en || '',
      fr: text.fr || text.en || '',
      ht: text.ht || text.en || ''
    });

    const group = {
      id: uuidv4(),
      name: createMultiLangText(body.name),
      description: createMultiLangText(body.description),
      dayOfWeek: body.dayOfWeek,
      time: body.time,
      language: body.language,
      lifeStage: body.lifeStage,
      location: createMultiLangText(body.location),
      contactEmail: body.contactEmail,
      leader: createMultiLangText(body.leader),
      capacity: parseInt(body.capacity),
      currentMembers: parseInt(body.currentMembers)
    };

    await createGroup(group);
    return NextResponse.json({ message: 'Group created successfully', id: group.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
  }
}
