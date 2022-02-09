/** @format */

const { BigPromise } = require("../middlewares/bigPromise");
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
    client_secret: paymentIntent.client_secret,
    payment_id: paymentIntent.id,
  });
});
