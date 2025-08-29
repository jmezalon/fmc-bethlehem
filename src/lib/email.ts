import nodemailer from 'nodemailer';

// Create Gmail SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
    },
  });
};

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD environment variables must be set');
  }

  const {
    to,
    subject,
    html,
    text,
    from = `FMCB <${process.env.GMAIL_USER}>`, // Use your Gmail address
  } = options;

  try {
    const transporter = createTransporter();
    
    const emailData = {
      from,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text,
    };

    const result = await transporter.sendMail(emailData);
    
    return {
      data: { id: result.messageId },
      error: null
    };
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

  contactForm: (name: string, email: string, phone: string, subject: string, message: string) => ({
    subject: `New Contact Message: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B1538;">New Contact Message</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 15px 0;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #666; font-size: 14px;">
          This message was submitted through the FMCB website contact form.
        </p>
      </div>
    `,
    text: `
New Contact Message

From: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

This message was submitted through the FMCB website contact form.
    `,
  }),
};
