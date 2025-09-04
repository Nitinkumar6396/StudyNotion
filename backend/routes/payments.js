import express from "express";
import { auth, isStudent } from "../middlewares/auth.js";
import { capturePayment, verifyPayment } from "../controllers/Payments.js";

const router = express.Router();

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);

export default router;
