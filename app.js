require("dotenv").config();

const express = require("express"),
  path = require("path"),
  logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  config = require("./config"),
  app = express();
  
/* DB connection secured here */
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected correctly to server");
});
// view engine setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const users = require("./routes/users");
const products = require("./routes/product");
const pastOrders = require("./routes/pastOrders");

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/pastorders", pastOrders);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const originalUrl = req.originalUrl
  if (originalUrl.indexOf(".") !== -1 || originalUrl.indexOf("/api") !== -1) {
    res.sendFile(path.join(__dirname, "client", "dist", req.originalUrl));
  } else {
    res.sendFile(path.join(__dirname, "client", "dist", 'index.html'));
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
