import React from 'react';
import nodemailer from 'nodemailer';

export default function EmailSender() {
  const sendEmail = async () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password',
      },
    });
    const mailOptions = {
      from: 'your-email@example.com',
      to: 'recipient@example.com',
      subject: 'Hello from ReactJS',
      text: 'This is a test email sent using SMTP and ReactJS',
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}
