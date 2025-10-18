import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const mailSender = async (email, title, body) => {
  try {
    const info = await resend.emails.send({
      from: "StudyNotion <onboarding@resend.dev>",
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.id);
    return info;
  } catch (err) {
    console.error("Mail sending error:", err.message);
    throw err;
  }
};
