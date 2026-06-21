import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter;

const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

if (isSmtpConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Verify the connection configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ SMTP Connection Error:', error.message);
    } else {
      console.log('✅ SMTP Mailer is ready to deliver messages');
    }
  });
} else {
  console.warn('⚠️ SMTP credentials not fully configured. Email service will run in DEV mode (emails printed to console).');
  // Mock transporter for development/testing
  transporter = {
    sendMail: async (options) => {
      console.log('================= [DEV MAIL SENDER] =================');
      console.log(`From:    ${options.from}`);
      console.log(`To:      ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log('-----------------------------------------------------');
      console.log('HTML Body (truncated):\n', options.html ? options.html.substring(0, 1000) + '...' : '[No Body]');
      console.log('=====================================================');
      return { messageId: 'mock-id-12345', response: '250 OK: Mock message accepted' };
    }
  };
}

export default transporter;
