import { NextRequest, NextResponse } from 'next/server';
import { deleteSermon, initDatabase } from '@/lib/database';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    await deleteSermon(params.id);
    return NextResponse.json({ message: 'Sermon deleted successfully' });
  } catch (error) {
    console.error('Error deleting sermon:', error);
    return NextResponse.json({ error: 'Failed to delete sermon' }, { status: 500 });
  }
}
