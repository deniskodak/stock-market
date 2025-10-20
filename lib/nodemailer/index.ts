import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './templates';

if (!process.env.NODEMAILER_EMAIL_SERVICE || !process.env.NODEMAILER_EMAIL_USER || !process.env.NODEMAILER_EMAIL_PASS) {
  throw new Error('Nodemailer environment variables are not set properly.');
}

export const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_EMAIL_SERVICE,
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASS,
  },
})

export const sendWelcomeEmail = async (email: string, name: string, introText: string) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', introText);
  const mailOptions = {
    from: `'Signalist' <${process.env.NODEMAILER_EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Signalist - your stock market toolkit is ready.',
    text: `Hello ${name},\n\n${introText}\n\nWelcome to Signalist! We're excited to have you on board.\n\nBest regards,\nThe Signalist Team`,
    html: htmlTemplate,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}