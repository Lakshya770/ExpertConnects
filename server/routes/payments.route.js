import { Router } from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/payments.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const routerpayments = Router();

routerpayments.route("/checkout").post(verifyJWT, checkout);
routerpayments
  .route("/paymentverification")
  .post(verifyJWT, paymentVerification);
routerpayments
  .route("/getkey")
  .get(verifyJWT, (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
  );

export default routerpayments;
