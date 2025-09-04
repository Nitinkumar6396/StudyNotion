
import User from "../models/User.js";
import { mailSender } from "../utils/mailSender.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Generate Reset Password Token and send email
export const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    console.log(email)

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Your email is not registered with us",
      });
    }

    // Generate token
    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
      },
      { new: true }
    );

    const url = `http://localhost:5173/update-password/${token}`
    await mailSender(
      email,
      "Password Reset Link",
      `Password reset link: <a href="${url}">${url}</a>`
    );

    return res.json({
      success: true,
      message: "Email sent successfully. Please check your inbox.",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Something went wrong while sending the reset password mail",
    });
  }
};

// Reset the password using token
export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const userDetails = await User.findOne({ token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token has expired. Please request a new one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: undefined,
        resetPasswordExpires: undefined,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Something went wrong while resetting the password",
    });
  }
};
