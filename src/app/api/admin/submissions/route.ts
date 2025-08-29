import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, initDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const password = request.headers.get('x-admin-password');

    // Check admin password
    if (password !== process.env.PRAYER_ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize database and get submissions
    try {
      await initDatabase();
      const submissions = await getSubmissions(type || undefined);
      
      return NextResponse.json({
        success: true,
        submissions,
        total: submissions.length,
      });
    } catch (dbError) {
      console.error('Database error, falling back to empty results:', dbError);
      return NextResponse.json({
        success: true,
        submissions: [],
        total: 0,
      });
    }

  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
