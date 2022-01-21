/** @format */

const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();

// connect with DB
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at PORT ${process.env.PORT}`);
});
