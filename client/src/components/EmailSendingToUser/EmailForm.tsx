import React, { useState } from 'react';
import nodemailer from 'nodemailer';

export default function EmailSendingToUser() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    const handleMessageChange = (e) => {
      setMessage(e.target.value);
    };
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
        to: email,
        subject: 'Hello from ReactJS',
        text: message,
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
        <input type="email" value={email} onChange={handleEmailChange} />
        <textarea value={message} onChange={handleMessageChange} />
        <button onClick={sendEmail}>Send Email</button>
      </div>
    );
  };
}
