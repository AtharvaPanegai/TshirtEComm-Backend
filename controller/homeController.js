/** @format */

exports.home = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from API",
  });
};


exports.dummy = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "This is another dummy router",
  });
};
