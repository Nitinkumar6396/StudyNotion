
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mailSender = async (email, title, body) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (err) {
    console.log("Mail sending error:", err.message);
    process.exit(1);
  }
};
