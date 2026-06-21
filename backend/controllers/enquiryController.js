import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import mailer from '../config/mailer.js';

// Compile template lazily and cache it
let cachedTemplate = null;
const getTemplate = () => {
  if (cachedTemplate) return cachedTemplate;
  try {
    const templatePath = path.join(process.cwd(), 'templates', 'enquiryTemplate.handlebars');
    const source = fs.readFileSync(templatePath, 'utf8');
    cachedTemplate = handlebars.compile(source);
    return cachedTemplate;
  } catch (error) {
    console.error('❌ Error reading template file:', error);
    throw new Error('Email template loading failed.');
  }
};

let cachedConfirmationTemplate = null;
const getConfirmationTemplate = () => {
  if (cachedConfirmationTemplate) return cachedConfirmationTemplate;
  try {
    const templatePath = path.join(process.cwd(), 'templates', 'confirmationTemplate.handlebars');
    const source = fs.readFileSync(templatePath, 'utf8');
    cachedConfirmationTemplate = handlebars.compile(source);
    return cachedConfirmationTemplate;
  } catch (error) {
    console.error('❌ Error reading confirmation template file:', error);
    throw new Error('Email template loading failed.');
  }
};

/**
 * Handles the contact enquiry submission
 */
export const submitEnquiry = async (req, res) => {
  const { name, email, company, college, phone, interest, message } = req.body;

  // 1. Validation Checks
  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Full Name is required.' });
  }
  if (name.length > 100) {
    return res.status(400).json({ success: false, message: 'Full Name must be less than 100 characters.' });
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({ success: false, message: 'Email address is required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!phone || phone.trim() === '') {
    return res.status(400).json({ success: false, message: 'Phone number is required.' });
  }
  // Allow digits, spaces, hyphens, parentheses, and optional leading +
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid phone number (7-20 digits).' });
  }

  if (!interest || interest.trim() === '') {
    return res.status(400).json({ success: false, message: 'Interested topic is required.' });
  }
  const validInterests = ['training', 'enterprise', 'partnership', 'other'];
  if (!validInterests.includes(interest)) {
    return res.status(400).json({ success: false, message: 'Invalid interest category.' });
  }

  // 2. Input Sanitization (strip HTML tags to prevent injection in the email body)
  const sanitize = (val) => {
    if (!val) return '';
    return val.replace(/<[^>]*>/g, '').trim();
  };

  const cleanData = {
    name: sanitize(name),
    email: sanitize(email),
    company: sanitize(company),
    college: sanitize(college),
    phone: sanitize(phone),
    interest: sanitize(interest),
    message: sanitize(message),
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)'
  };

  try {
    const template = getTemplate();
    const htmlBody = template(cleanData);

    const sender = process.env.CONTACT_EMAIL_SENDER || (process.env.SMTP_USER ? `"Thread Security Forms" <${process.env.SMTP_USER}>` : undefined);
    const receiver = process.env.CONTACT_EMAIL_RECEIVER || process.env.SMTP_USER;

    if (!receiver && !process.env.SMTP_USER && process.env.SMTP_HOST) {
      console.error('❌ CONTACT_EMAIL_RECEIVER and SMTP_USER are both empty.');
      return res.status(500).json({
        success: false,
        message: 'Mail service configuration error. Please contact administrative support.'
      });
    }

    const mailOptions = {
      from: sender || '"Thread Security Forms" <no-reply@threadsecurity.in>',
      to: receiver || 'recipient@example.com',
      subject: `New Contact Form Enquiry: ${cleanData.name} (${cleanData.interest.toUpperCase()})`,
      html: htmlBody,
      headers: {
        'X-Mailer-Form': 'Thread-Security-General-Enquiry'
      }
    };

    const info = await mailer.sendMail(mailOptions);
    console.log(`✉️ Enquiry email sent successfully to Admin. Message ID: ${info.messageId}`);

    // Send thank you confirmation auto-responder to the user
    try {
      const confirmationTemplate = getConfirmationTemplate();
      const confirmationHtmlBody = confirmationTemplate(cleanData);

      const confirmationMailOptions = {
        from: sender || '"Thread Security" <no-reply@threadsecurity.in>',
        to: cleanData.email,
        subject: `Thank you for contacting Thread Security!`,
        html: confirmationHtmlBody,
        headers: {
          'X-Mailer-Form': 'Thread-Security-User-Confirmation'
        }
      };

      const confirmInfo = await mailer.sendMail(confirmationMailOptions);
      console.log(`✉️ Confirmation email auto-responded successfully to ${cleanData.email}. Message ID: ${confirmInfo.messageId}`);
    } catch (confError) {
      console.error('⚠️ User confirmation email auto-response dispatch failure:', confError);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for your enquiry. We have received it and will get back to you shortly!'
    });
  } catch (error) {
    console.error('❌ Enquiry dispatch failure:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process your enquiry. Please try again later or contact us directly at support@threadsecurity.com.'
    });
  }
};
