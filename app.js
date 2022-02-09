/** @format */

const express = require("express");
var morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// documentation middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// for cookies and file Middlewares
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// temp check
app.set("view engine", "ejs");

// mogran middleware
app.use(morgan("tiny"));

// import all routes here
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");
// router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.get("/signupTest", (req, res) => {
  res.render("signupTest");
});

// export app js
module.exports = app;
