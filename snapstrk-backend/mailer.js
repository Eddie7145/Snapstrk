const nodemailer = require('nodemailer');

// Create a transporter for Gmail (you can change this to another service if needed)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send an invitation email
const sendInviteEmail = async (recipientEmail, circleName, inviteLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email address
    to: recipientEmail, // Recipient's email
    subject: `You're invited to join the circle: ${circleName} on Snapstrk!`,
    html: `
      <p>Hello,</p>
      <p>You have been invited to join the circle <strong>${circleName}</strong> on Snapstrk.</p>
      <p>Click the link below to accept the invitation and create an account:</p>
      <a href="${inviteLink}">Join Circle</a>
      <p>Looking forward to seeing you there!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Invitation email sent successfully');
  } catch (error) {
    console.error('Error sending invitation email:', error);
    throw error;
  }
};

module.exports = { sendInviteEmail };
