import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const adminSecret = process.env.PRAYER_ADMIN_SECRET || 'prayer-admin-2024';
    
    if (token !== adminSecret) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { prayerId, isPublic } = await request.json();
    
    const prayersFile = path.join(process.cwd(), 'data', 'prayers.json');
    
    if (!existsSync(prayersFile)) {
      return NextResponse.json(
        { success: false, message: 'Prayers file not found' },
        { status: 404 }
      );
    }

    // Read current prayers
    const fileContent = await readFile(prayersFile, 'utf-8');
    const prayers = JSON.parse(fileContent);

    // Find and update the prayer
    const prayerIndex = prayers.findIndex((p: any) => p.id === prayerId);
    
    if (prayerIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Prayer not found' },
        { status: 404 }
      );
    }

    prayers[prayerIndex].isPublic = isPublic;

    // Write updated prayers back to file
    await writeFile(prayersFile, JSON.stringify(prayers, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: `Prayer visibility updated to ${isPublic ? 'public' : 'private'}` 
    });
  } catch (error) {
    console.error('Error toggling prayer visibility:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update prayer visibility' },
      { status: 500 }
    );
  }
}
