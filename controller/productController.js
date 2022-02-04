/** @format */

exports.testController = async (req, res, next) => {
  // test route
  res.status(200).json({
    success: true,
  });
};
