# EmailJS Setup Guide for OTP Verification

This guide will help you set up EmailJS to send real OTP emails to users.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** OTP Verification

**Subject:** Your BolSaathi Verification Code

**Content:**
```
Hello,

Your verification code for BolSaathi is: {{otp}}

This code will expire in 5 minutes.

Use this code to {{purpose}} to your account.

If you didn't request this code, please ignore this email.

Best regards,
BolSaathi Team
```

4. Save the template and copy your **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

## Step 6: Restart Development Server

After adding environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Testing

1. Try signing up with a real email address
2. Check your email inbox for the OTP
3. Enter the OTP to verify your account

## Development Mode (Fallback)

If EmailJS is not configured, the app will:
- Generate OTP and store it in localStorage
- Display OTP in browser console for testing
- Still work for development purposes

**To see OTP in console:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for: `[DEV MODE] OTP for your@email.com: 123456`

## Troubleshooting

### OTP not received?
- Check spam/junk folder
- Verify EmailJS service is active
- Check environment variables are correct
- Restart dev server after adding env variables

### EmailJS errors?
- Verify Service ID, Template ID, and Public Key are correct
- Check EmailJS dashboard for service status
- Ensure email service is connected properly

## Production Deployment

For production:
1. Use environment variables in your hosting platform
2. Consider upgrading EmailJS plan for more emails
3. Monitor email delivery in EmailJS dashboard

