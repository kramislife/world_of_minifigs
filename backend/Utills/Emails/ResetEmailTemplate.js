export const getResetPasswordTemplate = (user, resetUrl) => {
  const name = user.name;
  console.log("USER IN RESET PASSWORD TEMPLATE ", user);

  const appName = process.env.SMTP_FROM_NAME; // Replace with your application name
  const supportEmail = process.env.SMTP_FROM_EMAIL; // Replace with your support email

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
      </head>
      <body class="bg-gray-100 font-sans">
        <div class="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="bg-blue-600 text-white text-center py-4">
            <h1 class="text-2xl font-semibold">${appName}</h1>
          </div>
          <div class="p-6">
            <p class="text-gray-800 text-lg">Hi ${name},</p>
            <p class="text-gray-700 mt-4">
              We received a request to reset your password for your ${appName} account.
            </p>
            <p class="text-gray-700 mt-4">
              Click the button below to reset your password:
            </p>
            <div class="text-center mt-6">
              <a href="${resetUrl}" 
                 class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300">
                Reset Password
              </a>
            </div>
            <p class="text-gray-700 mt-6">
              If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.
            </p>
            <p class="text-gray-700 mt-4">
              This link will expire in ${
                process.env.PASSWORD_RESET_EXPIRY
              } mins for security reasons.
            </p>
            <p class="text-gray-800 mt-6">Thanks,</p>
            <p class="text-gray-800">${appName} Team</p>
          </div>
          <div class="bg-gray-100 text-center py-4 text-sm text-gray-600">
            <p>If you have any questions, feel free to reach us at 
              <a href="mailto:${supportEmail}" class="text-blue-600 hover:underline">
                ${supportEmail}
              </a>.
            </p>
            <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
