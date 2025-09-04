
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Authentication Middleware
export const auth = async (req, res, next) => {

  try {
    // console.log('before authentication')
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      // console.log('token is empty')
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    // console.log('token is available')

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    // console.log('after authentication')

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};



// Role-based Authorization Middlewares
export const isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to Students only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Role verification failed. Please try again.",
    });
  }
};

export const isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to Instructors only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Role verification failed. Please try again.",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to Admins only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Role verification failed. Please try again.",
    });
  }
};
