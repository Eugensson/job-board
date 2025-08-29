import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_URL;
const pass = process.env.NODEMAILER_SENDER_PASSWORD;
const emailSender = process.env.NODEMAILER_SENDER_EMAIL;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: emailSender, pass },
});

export const sendEmail = async (email: string, jobListingHtml: string) => {
  try {
    await transporter.sendMail({
      from: emailSender,
      to: email,
      subject: "Latest Job Opportunities for you!",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto">
        <h2>Latest Job Opportunities for you!</h2>
        ${jobListingHtml}
        <div style="margin-top: 30px; text-align: center">
            <a href="${domain}" style="background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold">
                View All Jobs
            </a>
        </div>
      </div>`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
