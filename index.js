/** @format */

const app = require("./app");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at PORT ${process.env.PORT}`);
});
