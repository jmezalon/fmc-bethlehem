import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedFlyer, setFeaturedFlyer, initDatabase } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function checkAuth(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  return password === process.env.PRAYER_ADMIN_SECRET;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    await initDatabase();
    const flyer = await getFeaturedFlyer();
    return NextResponse.json(flyer);
  } catch (error) {
    console.error('Error fetching featured flyer:', error);
    return NextResponse.json({ error: 'Failed to fetch featured flyer' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    await initDatabase();
    const body = await request.json();

    const flyer = {
      active: Boolean(body.active),
      title: String(body.title || ''),
      subtitle: String(body.subtitle || ''),
      portraitImage: String(body.portraitImage || ''),
      landscapeImage: String(body.landscapeImage || ''),
      startDate: String(body.startDate || ''),
      endDate: String(body.endDate || ''),
      time: String(body.time || ''),
      location: String(body.location || ''),
      linkUrl: String(body.linkUrl || '/events'),
    };

    await setFeaturedFlyer(flyer);
    return NextResponse.json({ message: 'Featured flyer updated successfully' });
  } catch (error) {
    console.error('Error updating featured flyer:', error);
    return NextResponse.json({ error: 'Failed to update featured flyer' }, { status: 500 });
  }
}
