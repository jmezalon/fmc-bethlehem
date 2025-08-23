import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
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

    const prayersFile = path.join(process.cwd(), 'data', 'prayers.json');

    if (!existsSync(prayersFile)) {
      return NextResponse.json({ prayers: [] });
    }

    const fileContent = await readFile(prayersFile, 'utf-8');
    const prayers = JSON.parse(fileContent);

    return NextResponse.json({ prayers });
  } catch (error) {
    console.error('Error fetching admin prayers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch prayers' },
      { status: 500 }
    );
  }
}
