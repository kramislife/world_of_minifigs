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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
          color: #333;
          line-height: 1.6;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }
        .header h1 {
          color: #2563eb;
          font-size: 28px;
          margin: 0;
          font-weight: 600;
        }
        .content {
          font-size: 16px;
          color: #4b5563;
          margin-bottom: 30px;
        }
        .highlight {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
        }
        .verify-button {
          display: inline-block;
          padding: 14px 32px;
          background-color: #2563eb;
          color: white !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 25px 0;
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
          transition: transform 0.2s ease;
        }
        .verify-button:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
        }
        .alternative-link {
          word-break: break-all;
          color: #6b7280;
          margin-top: 20px;
          font-size: 14px;
          background-color: #f3f4f6;
          padding: 12px;
          border-radius: 8px;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #9ca3af;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
        }
        .social-links {
          margin-top: 20px;
        }
        .social-link {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        .warning {
          color: #dc2626;
          font-size: 14px;
          margin-top: 20px;
          background-color: #fee2e2;
          padding: 12px;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to ${process.env.SMTP_FROM_NAME}!</h1>
        </div>
        
        <div class="content">
          <p>Hello ${option.name},</p>
          
          <div class="highlight">
            <p>Thank you for joining us! To ensure the security of your account and access all features, please verify your email address by clicking the button below:</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${verificationLink}" class="verify-button">
              Verify Email Address
            </a>
          </div>
          
          <p class="warning">
            This verification link will expire in 1 hour for security reasons.
          </p>
          
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${
    process.env.SMTP_FROM_NAME
  }. All rights reserved.</p>
          <div class="social-links">
            <a href="#" class="social-link">Contact Support</a>
            <a href="#" class="social-link">Privacy Policy</a>
            <a href="#" class="social-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Define the email message
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: option.email,
    subject: option.subject || "Verify Your Email",
    html: htmlTemplate,
  };

  // Send the email
  await transport.sendMail(message);
};

export default sendVerificationEmail;
