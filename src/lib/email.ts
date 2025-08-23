import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  const {
    to,
    subject,
    html,
    text,
    from = 'FMCB <noreply@fmcbethlehem.org>',
  } = options;

  try {
    const emailData: any = {
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
    };

    if (html) {
      emailData.html = html;
    }
    if (text) {
      emailData.text = text;
    }

    const result = await resend.emails.send(emailData);

    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

// Email templates
export const emailTemplates = {
  prayerRequest: (name: string, request: string, isPublic: boolean) => ({
    subject: 'New Prayer Request Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B1538;">New Prayer Request</h2>
        <p><strong>From:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Public:</strong> ${isPublic ? 'Yes' : 'No'}</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Prayer Request:</h3>
          <p>${request}</p>
        </div>
        <p style="color: #666; font-size: 14px;">
          This prayer request was submitted through the FMCB website.
        </p>
      </div>
    `,
    text: `
New Prayer Request

From: ${name || 'Anonymous'}
Public: ${isPublic ? 'Yes' : 'No'}

Prayer Request:
${request}

This prayer request was submitted through the FMCB website.
    `,
  }),

  eventReminder: (
    eventTitle: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string
  ) => ({
    subject: `Reminder: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B1538;">Event Reminder</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0;">${eventTitle}</h3>
          <p><strong>Date:</strong> ${eventDate}</p>
          <p><strong>Time:</strong> ${eventTime}</p>
          <p><strong>Location:</strong> ${eventLocation}</p>
        </div>
        <p>We look forward to seeing you there!</p>
        <p style="color: #666; font-size: 14px;">
          This is an automated reminder from FMCB.
        </p>
      </div>
    `,
    text: `
Event Reminder: ${eventTitle}

Date: ${eventDate}
Time: ${eventTime}
Location: ${eventLocation}

We look forward to seeing you there!

This is an automated reminder from FMCB.
    `,
  }),

  newsletterSubscription: (email: string) => ({
    subject: 'Welcome to FMCB Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B1538;">Welcome to FMCB!</h2>
        <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
        <ul>
          <li>Upcoming events and activities</li>
          <li>Service announcements</li>
          <li>Community news</li>
          <li>Prayer requests</li>
        </ul>
        <p>We're excited to keep you connected with our church family!</p>
        <p style="color: #666; font-size: 14px;">
          You can unsubscribe at any time by replying to this email.
        </p>
      </div>
    `,
    text: `
Welcome to FMCB!

Thank you for subscribing to our newsletter. You'll now receive updates about:
- Upcoming events and activities
- Service announcements
- Community news
- Prayer requests

We're excited to keep you connected with our church family!

You can unsubscribe at any time by replying to this email.
    `,
  }),
};
