import { NextRequest, NextResponse } from 'next/server';
import { migrateData } from '@/scripts/migrate-data';

export async function POST(request: NextRequest) {
  try {
    await migrateData();
    return NextResponse.json({ message: 'Data migration completed successfully' });
  } catch (error) {
    console.error('Migration API error:', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
