import { NextRequest, NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

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

    const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
    
    if (!existsSync(submissionsDir)) {
      return NextResponse.json({
        success: true,
        submissions: [],
        total: 0,
      });
    }

    // Read all submission files
    const files = await readdir(submissionsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // Filter by type if specified
    const filteredFiles = type 
      ? jsonFiles.filter(file => file.startsWith(`${type}_`))
      : jsonFiles;

    // Read and parse all submissions
    const submissions = await Promise.all(
      filteredFiles.map(async (file) => {
        const filepath = path.join(submissionsDir, file);
        const content = await readFile(filepath, 'utf-8');
        return JSON.parse(content);
      })
    );

    // Sort by submission date (newest first)
    submissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return NextResponse.json({
      success: true,
      submissions,
      total: submissions.length,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
