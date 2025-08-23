import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();
    
    // Check against environment variable
    const adminSecret = process.env.PRAYER_ADMIN_SECRET || 'prayer-admin-2024';
    
    if (secret === adminSecret) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid secret key' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error in prayer admin auth:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
