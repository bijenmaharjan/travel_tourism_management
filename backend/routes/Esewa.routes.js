const express = require("express");
const router = express.Router();
const axios = require("axios");

// eSewa Payment Initiation
router.post("/initiate", async (req, res) => {
  try {
    const { amount, productName } = req.body;

    const payload = {
      amount,
      productName,
      productId: `PID_${Date.now()}`,
      merchantCode: process.env.ESEWA_MERCHANT_CODE,
      callbackUrl: `${process.env.BACKEND_URL}/esewa/verify`,
    };

    res.status(200).json({
      success: true,
      data: payload,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res
      .status(500)
      .json({ success: false, error: "Payment initiation failed" });
  }
});

// eSewa Payment Verification
router.post("/verify", async (req, res) => {
  try {
    const { amount, referenceId, bookingId } = req.query;

    const verificationResponse = await axios.post(
      process.env.ESEWA_VERIFICATION_URL,
      {
        amt: amount,
        rid: referenceId,
        pid: bookingId,
        scd: process.env.ESEWA_MERCHANT_CODE,
      }
    );

    if (verificationResponse.data === "Success") {
      // Update your database here
      return res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
  }
});

module.exports = router;
