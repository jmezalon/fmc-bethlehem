import { NextResponse } from 'next/server';
import { getFeaturedFlyer, initDatabase } from '@/lib/database';

export async function GET() {
  try {
    await initDatabase();
    const flyer = await getFeaturedFlyer();
    return NextResponse.json(flyer);
  } catch (error) {
    console.error('Error fetching featured flyer:', error);
    return NextResponse.json({ error: 'Failed to fetch featured flyer' }, { status: 500 });
  }
}
