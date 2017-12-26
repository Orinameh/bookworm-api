import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const from = '"Bookworm" <info@bookworm.com>';

function setUp() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

export function sendConfirmationEmail(user) {
  const transport = setUp();
  const email = {
    from,
    to: user.email,
    subject: 'Welcome to Bookworm',
    text: `
      Welcome to Bookworm.Please, confirm your email.

      ${user.generateConfirmationUrl()}
    `
  }

  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setUp();
  const email = {
    from,
    to: user.email,
    subject: 'Reset Password',
    text: `
      To reset password follow this link.

      ${user.generateResetPasswordLink()}
    `
  }

  transport.sendMail(email);
}
