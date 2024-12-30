import nodemailer from "nodemailer";

// SEND EMAIL USING SMTP AND NODEMAILER
const sendVerificationEmail = async (option, verificationLink) => {
  console.log("SENDING EMAIL", option);

  // Create the transporter using SMTP settings
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Define the HTML email template
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Email | ${process.env.SMTP_FROM_NAME}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #4CAF50;
        }
        .content {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .content a {
          color: #4CAF50;
          text-decoration: none;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #888;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome, ${option.username}!</h1>
        </div>
        <div class="content">
          <p>Dear ${option.name},</p>
           To complete your registration, please click the link below to verify your email address:</p>
          <p><a href="${verificationLink}" target="_blank">Verify your email</a></p>
          <p>If you did not request this verification, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${
    process.env.SMTP_FROM_NAME
  }. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Define the email message
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: option.email,
    subject: option.subject,
    html: htmlTemplate, // Use the dynamically generated HTML template here
  };

  // Send the email
  await transport.sendMail(message);
};

export default sendVerificationEmail;
