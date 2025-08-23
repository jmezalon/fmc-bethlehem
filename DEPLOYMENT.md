# FMCB Website Deployment Guide

This guide will help church volunteers deploy and maintain the Free Methodist Church of Bethlehem website.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier is sufficient)
- Basic understanding of environment variables

## Initial Deployment to Vercel

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import the `fmc-bethlehem` repository from GitHub
4. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=FMCB
RESEND_API_KEY=your-resend-api-key-here
CONTACT_EMAIL=methodistchurch1993@gmail.com
```

**Important:** Replace `your-domain.vercel.app` with your actual Vercel domain.

### 3. Deploy

1. Click **Deploy** in Vercel
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

## Setting Up Email Functionality

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your email domain (or use their test domain for development)
3. Generate an API key
4. Add it to your Vercel environment variables as `RESEND_API_KEY`

### 2. Configure Email Settings

- Contact form submissions will be sent to `methodistchurch1993@gmail.com`
- Prayer requests will also be forwarded to this email
- Newsletter subscriptions are handled automatically

## Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `fmcbethlehem.org`)
3. Follow Vercel's DNS configuration instructions

### 2. Update Environment Variables

Update `NEXT_PUBLIC_SITE_URL` to your custom domain:
```
NEXT_PUBLIC_SITE_URL=https://fmcbethlehem.org
```

## Content Management

### Updating Church Information

Edit these files to update church details:

- **Contact Info**: `/messages/en.json` (and `fr.json`, `ht.json` for translations)
- **Service Times**: `/data/events.json`
- **Sermons**: `/data/sermons.json`
- **Events**: `/data/events.json`

### Adding New Sermons

1. Edit `/data/sermons.json`
2. Add new sermon object with:
   - `id`: Unique identifier
   - `title`: Sermon title in all languages
   - `date`: Date in YYYY-MM-DD format
   - `speaker`: Pastor name
   - `videoUrl`: YouTube video ID
   - `audioUrl`: Direct audio file URL (optional)

### Adding Events

1. Edit `/data/events.json`
2. Add event object with required fields
3. Include translations for all supported languages (en, fr, ht)

## Maintenance Tasks

### Weekly Tasks
- [ ] Update upcoming events
- [ ] Add new sermons
- [ ] Check contact form submissions

### Monthly Tasks
- [ ] Review website analytics
- [ ] Update church announcements
- [ ] Check for broken links

### Quarterly Tasks
- [ ] Update church photos
- [ ] Review and update content
- [ ] Check email deliverability

## Troubleshooting

### Build Failures

1. Check Vercel build logs for errors
2. Ensure all environment variables are set
3. Verify JSON files have valid syntax

### Email Not Working

1. Verify `RESEND_API_KEY` is correct
2. Check Resend dashboard for delivery status
3. Ensure sender domain is verified

### Content Not Updating

1. Check if changes were committed to GitHub
2. Verify Vercel auto-deployment is enabled
3. Manually trigger deployment in Vercel dashboard

## Support Contacts

- **Technical Issues**: Contact the web development team
- **Content Updates**: Church communications team
- **Domain/Hosting**: Church administration

## File Structure Reference

```
/data/
  ├── events.json      # Church events and activities
  ├── sermons.json     # Sermon archive
  └── groups.json      # Church groups and ministries

/messages/
  ├── en.json          # English translations
  ├── fr.json          # French translations
  └── ht.json          # Haitian Creole translations

/public/
  ├── logo.jpeg        # Church logo
  ├── fmcb-hero.png    # Hero image
  └── favicon.jpeg     # Website icon
```

## Security Notes

- Never commit API keys to the repository
- Use environment variables for all sensitive data
- Regularly update dependencies
- Monitor Vercel security alerts

---

*Last updated: January 2025*
*For technical support, please contact the development team*
