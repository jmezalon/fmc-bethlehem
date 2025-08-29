import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Add timestamp, ID, and format name
    const submission = {
      id: Date.now().toString(),
      type: 'new-member-class',
      submittedAt: new Date().toISOString(),
      name: `${data.firstName} ${data.lastName}`,
      ...data,
    };

    // Ensure submissions directory exists
    const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
    if (!existsSync(submissionsDir)) {
      await mkdir(submissionsDir, { recursive: true });
    }

    // Save to JSON file
    const filename = `new-member-class_${submission.id}.json`;
    const filepath = path.join(submissionsDir, filename);
    await writeFile(filepath, JSON.stringify(submission, null, 2));

    // TODO: Send confirmation email using Resend
    console.log('New Member Class form submitted:', submission.id);

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submission.id,
    });
  } catch (error) {
    console.error('Error processing new member class form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
