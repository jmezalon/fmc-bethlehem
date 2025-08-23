import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const prayersFile = path.join(process.cwd(), 'data', 'prayers.json');

    if (!existsSync(prayersFile)) {
      return NextResponse.json({ prayers: [] });
    }

    const fileContent = await readFile(prayersFile, 'utf-8');
    const allPrayers = JSON.parse(fileContent);

    // Filter only public prayers and remove sensitive information
    const publicPrayers = allPrayers
      .filter((prayer: any) => prayer.isPublic === true)
      .map((prayer: any) => ({
        id: prayer.id,
        initials: prayer.initials,
        request: prayer.request,
        submittedAt: prayer.submittedAt,
        isPublic: prayer.isPublic,
      }))
      .slice(0, 50); // Limit to 50 most recent public prayers

    return NextResponse.json({ prayers: publicPrayers });
  } catch (error) {
    console.error('Error fetching public prayers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch prayers' },
      { status: 500 }
    );
  }
}
