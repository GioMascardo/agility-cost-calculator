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
  user: "sid.cd.varma@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "inquiry@agilitystaffingservices.com",
  to: "gl.mascardo@gmail.com",
  subject: "Gmail API NodeJS",
};

export default async function handler(request, response) {
  const oAuth2Client = new google.auth.oAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        auth,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      mailoptions,
      text: "The Gmail API with NodeJS works",
    };

    const result = await transport.sendMail(mailOptions);
    response.send(result);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
}
