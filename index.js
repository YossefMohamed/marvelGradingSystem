const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./database");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
var bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
// app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require("cookie-parser");
const classRoute = require("./routes/classRoutes/class");
const { protect } = require("./utils/protect");
const User = require("./models/user");

app.use(cookieParser());
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDB();
app.get("/", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const login = await jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(login.id);
    if (freshUser) res.redirect("/dashboard");
  }
  res.status(200).render("index.ejs", {
    error: "",
  });
});
app.use("/class", classRoute);
app.use(userRoutes);
app.use("*", (req, res) => {
  res.status(404).redirect("/");
});
// app.use((req, res, next) => {
//   // console.log(res);
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// });

// // app.use((err, req, res, next) => {
// //   // console.log(res);
// //   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

// //   res.json({
// //     message: err.message,
// //     stack: err.stack,
// //   });
// // });

app.listen(port, "0.0.0.0", function () {
  console.log("Listening to port:  " + port);
});
