/** @format */

const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise(async (req, res) => {
  // const db = await something()
  res.status(200).json({
    success: true,
    greeting: "Hello from API",
  });
});

exports.dummy = BigPromise((req, res) => {
  res.status(200).json({
    success: true,
    greeting: "This is another dummy router",
  });
});
