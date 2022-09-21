import sgMail from "@sendgrid/mail";

console.log("before setApiKey", process.env.VITE_SG_API_KEY);
sgMail.setApiKey(process.env.VITE_SG_API_KEY);

export default async function handler(request, response) {
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
    })
    .catch((error) => {
      console.error(error);
    });

  return response.status(200).json({ res: "test response" });
}
