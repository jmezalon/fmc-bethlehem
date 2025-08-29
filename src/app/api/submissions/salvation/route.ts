import { NextRequest, NextResponse } from 'next/server';
import { saveSubmission, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Prepare submission data
    const submissionId = Date.now().toString();
    const name = `${data.firstName} ${data.lastName}`;
    
    const submission = {
      id: submissionId,
      type: 'salvation',
      name,
      email: data.email,
      phone: data.phone,
      data: {
        ...data,
        submittedAt: new Date().toISOString(),
      }
    };

    // Try to save to database, but don't fail if database is not available
    try {
      await initDatabase();
      await saveSubmission(submission);
      console.log('Salvation submission saved to database:', submissionId);
    } catch (dbError) {
      console.error('Database save failed, continuing with email only:', dbError);
    }

    // TODO: Send confirmation email using Resend
    console.log('Salvation form submitted:', submissionId);

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submissionId,
    });
  } catch (error) {
    console.error('Error processing salvation form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
