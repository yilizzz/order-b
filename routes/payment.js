const express = require("express");
const router = express.Router();
const paymentCtrl = require("../controllers/payment");

router.get("/config", paymentCtrl.stripeConfig);
router.post("/create-payment-intent", paymentCtrl.createPayment);
router.post("/webhook", paymentCtrl.handlePayment);
module.exports = router;
