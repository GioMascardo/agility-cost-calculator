import { google } from "googleapis";
import nodemailer from "nodemailer";

const generateConfig = (url, accessToken) => {
  return {
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${accessToken} `,
      "Content-type": "application/json",
    },
  };
};

const auth = {
  type: "OAuth2",
  user: "mascardogio@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "inquiry@agilitystaffingservices.com",
  subject: "Gmail API NodeJS",
};

export default async function handler(request, response) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const data = JSON.parse(request.body);

  const { firstName, email, dashboardSummary } = data;

  const message = `
    Hi ${firstName}, here's a summary of your entries on our cost calculator app:\r\n \r\n
    ${dashboardSummary.map((entry) => {
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
      Your savings: ${yourSavings} \r\n \r\n`;
    })}
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
      html: message.replace(/\r\n/g, "<br>"),
    };

    const result = await transport.sendMail(mailOptions);
    response.send(result);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
}
