import sgMail from "@sendgrid/mail";

sgMail.setApiKey(import.meta.env.VITE_SG_API_KEY);

export default async function handler(request, response) {
  // const body = JSON.parse(request.body);

  // const message = `
  //   Good day Mr./Ms. ${
  //     body.lastName
  //   },\r\n\r\nHere's a summary of your team using our cost calculator:\r\n
  //   ${body.dashboardSummary.forEach((row) => {
  //     let {
  //       role,
  //       staffRequired,
  //       experienceLevel,
  //       hireWithAgility,
  //       hireOnshore,
  //       yourSavings,
  //     } = row;
  //     return `- Role: ${role}, Number of ${role}${
  //       staffRequired > 1 ? "s" : ""
  //     }: ${staffRequired}, Experience Level: ${experienceLevel}, Hire With Us: ${hireWithAgility}, Hire Onshore: ${hireOnshore}, Your Savings: ${yourSavings}\r\n`;
  //   })}
  // `;

  // const data = {
  //   to: `${body.email}`,
  //   from: "mascardogio@gmail.com",
  //   subject: "Agility Cost Calculator Summary",
  //   text: message,
  //   html: message.replace(/\r\n/g, "<br>"),
  // };

  // sgMail.send(data);

  return response.status(200).json({ res: "test response" });
}
