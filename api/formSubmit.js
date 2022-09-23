import { google } from "googleapis";
import nodemailer from "nodemailer";

const auth = {
  type: "OAuth2",
  user: "mascardogio@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "Agility Staffing Solutions <inquiry@agilitystaffingservices.com>",
  subject: "Agility Staffing Solutions Cost Calculator",
};

export default async function handler(request, response) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const data = request.body;

  const { firstName, email, dashboardSummary, estimatedMonthlyCost } = data;

  const dashboardSummaryString = dashboardSummary.map((entry) => {
    const {
      role,
      staffRequired,
      experienceLevel,
      hireWithAgility,
      hireOnshore,
      yourSavings,
    } = entry;

    return `
    Role: ${role},
    No. of staff: ${staffRequired},
    Experience Level: ${experienceLevel},
    Hire onshore: ${hireOnshore},
    Hire with us: ${hireWithAgility},
    Your savings: ${yourSavings}
    `;
  }).join(`
  `);

  const message = `
    Hi ${firstName}, here's a summary of your entries on our cost calculator app:

    ${dashboardSummaryString}

    Your monthly cost estimate is: ${estimatedMonthlyCost}.
    Thank you for using our app. We will get back to you within 24 hours.
  `;

  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...auth,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      ...mailoptions,
      to: email,
      text: message,
      text: message,
    };

    const result = await transport.sendMail(mailOptions);
    response.send(result);
  } catch (error) {
    console.error(error);
  }
}
