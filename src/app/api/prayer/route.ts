import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Generate initials from name or use "Anonymous"
    const getInitials = (name?: string) => {
      if (!name || name.trim() === '') return 'A.';
      const words = name.trim().split(' ');
      if (words.length === 1) {
        return words[0].charAt(0).toUpperCase() + '.';
      }
      return words.map(word => word.charAt(0).toUpperCase()).join('.');
    };

    // Create prayer request object
    const prayerRequest = {
      id: Date.now().toString(),
      name: data.name || '',
      email: data.email,
      request: data.request,
      isPublic: data.isPublic || false,
      initials: getInitials(data.name),
      submittedAt: new Date().toISOString(),
    };

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing prayers or create empty array
    const prayersFile = path.join(dataDir, 'prayers.json');
    let prayers = [];

    if (existsSync(prayersFile)) {
      try {
        const fileContent = await readFile(prayersFile, 'utf-8');
        prayers = JSON.parse(fileContent);
      } catch (error) {
        console.error('Error reading prayers file:', error);
        prayers = [];
      }
    }

    // Add new prayer to the beginning of the array
    prayers.unshift(prayerRequest);

    // Write updated prayers back to file
    await writeFile(prayersFile, JSON.stringify(prayers, null, 2));

    // Send email notification to admin
    try {
      const emailTemplate = emailTemplates.prayerRequest(
        prayerRequest.name,
        prayerRequest.request,
        prayerRequest.isPublic
      );

      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'methodistchurch1993@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.log('Prayer request submitted and email sent:', prayerRequest.id);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Prayer request submitted successfully',
      id: prayerRequest.id,
    });
  } catch (error) {
    console.error('Error processing prayer request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit prayer request' },
      { status: 500 }
    );
  }
}
