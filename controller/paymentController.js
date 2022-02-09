/** @format */

const BigPromise = require("../middlewares/bigPromise");
const stripe = require("stripe")(process.env.STRIPE_SECKEY);

exports.sendStripeKey = BigPromise(async (req, res, next) => {
  res.satus(200).json({
    stripeKey: process.env.STRIPE_PUBKEY,
  });
});

exports.captureStripePayment = BigPromise(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: { integration_check: "accept_a_payment" },
  });
  res.status(200).json({
    success: true,
    amount: req.body.amount,
    client_secret: paymentIntent.client_secret,
    payment_id: paymentIntent.id,
  });
});

exports.sendRazorpayKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    razorPayPubKey: process.env.RAZORPAY_PUBKEY,
  });
});

exports.captureRazorpayPayment = BigPromise(async (req, res, next) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_PUBKEY,
    key_secret: process.env.RAZORPAY_SECKEY,
  });
  instance.orders.create({
    amount: req.body.amount,
    currency: "INR",
  });
  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount: req.body.amount,
    order: myOrder,
  });
});
