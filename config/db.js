/** @format */

const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Db is Connected"))
    .catch((err) => {
      console.log("Db Connection issue");
      console.log("====================================");
      console.log(err);
      console.log("====================================");

      process.exit(1);
    });
};

module.exports = connectDb;
