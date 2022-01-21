/** @format */

const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();
// cloudinary
const cloudinary = require("cloudinary");

// connect with DB
connectDb();

// cloudinary config goes here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at PORT ${process.env.PORT}`);
});
