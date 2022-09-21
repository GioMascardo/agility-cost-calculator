import sgMail from "@sendgrid/mail";
import "dotenv/config";
require("dotenv").config();

console.log("before setApiKey", process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(request, response) {
  if (request.method === "GET") {
    return response.status(200).json({ res: "successful get request" });
  }
  const body = JSON.parse(request.body);

  const message = `
    Good day Mr./Ms. ${body.lastName}, 
    this is a test email.
  `;

  const data = {
    to: `${body.email}`,
    from: "mascardogio@gmail.com",
    subject: "Agility Cost Calculator Summary",
    text: message,
  };

  sgMail
    .send(data)
    .then(() => {
      console.log("Email sent");
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
      console.log(data);
    });

  return response.status(200).json({ res: "test response" });
}
