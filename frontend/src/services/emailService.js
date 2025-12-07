// Email Service using EmailJS
// This service sends OTP emails to users

import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Get these from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP in localStorage with expiration
const storeOTP = (email, otp) => {
  const otpData = {
    otp,
    email,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  };
  localStorage.setItem(`otp_${email}`, JSON.stringify(otpData));
};

// Get and verify OTP from localStorage
export const verifyOTP = (email, enteredOTP) => {
  const storedData = localStorage.getItem(`otp_${email}`);
  if (!storedData) {
    return { valid: false, error: 'OTP not found. Please request a new one.' };
  }

  const otpData = JSON.parse(storedData);
  
  // Check expiration
  if (Date.now() > otpData.expiresAt) {
    localStorage.removeItem(`otp_${email}`);
    return { valid: false, error: 'OTP has expired. Please request a new one.' };
  }

  // Verify OTP
  if (otpData.otp !== enteredOTP) {
    return { valid: false, error: 'Invalid OTP. Please try again.' };
  }

  // OTP is valid, remove it
  localStorage.removeItem(`otp_${email}`);
  return { valid: true };
};

// Send OTP via EmailJS
export const sendOTPEmail = async (email, purpose = 'verification') => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('⚠️ EmailJS not configured. Using fallback OTP storage.');
      // Fallback: Generate OTP and store it (for development)
      const otp = generateOTP();
      storeOTP(email, otp);
      console.log(`%c🔐 [DEV MODE] OTP for ${email}: ${otp}`, 'background: #4CAF50; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
      console.log('📧 To receive real emails, configure EmailJS. See EMAILJS_SETUP.md for instructions.');
      return { 
        success: true, 
        message: 'OTP generated (check console or screen for OTP)',
        fallback: true,
        otp: otp // Return OTP for display in dev mode
      };
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP
    storeOTP(email, otp);

    // Prepare email template parameters
    const templateParams = {
      to_email: email,
      otp: otp,
      purpose: purpose === 'signup' ? 'sign up' : 'log in',
      app_name: 'BolSaathi',
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return { success: true, message: 'OTP sent successfully to your email' };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    
    // Fallback: Generate OTP and store it (for development/testing)
    const otp = generateOTP();
    storeOTP(email, otp);
    console.log(`%c🔐 [FALLBACK MODE] OTP for ${email}: ${otp}`, 'background: #FF9800; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
    
    return {
      success: true,
      message: 'OTP generated (check console or screen for OTP)',
      fallback: true,
      otp: otp // Return OTP for display in dev mode
    };
  }
};

// Clear OTP for an email
export const clearOTP = (email) => {
  localStorage.removeItem(`otp_${email}`);
};

