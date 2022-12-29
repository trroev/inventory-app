const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const inventoryRouter = require("./routes/inventory");

const app = express();
const mongoDB = process.env.MONGO_DB_URL;

// Connect to MongoDB
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// Use basic auth middleware for certain routes
const basicAuth = require("express-basic-auth");
const authMiddleware = basicAuth({
  users: { [process.env.USERNAME]: process.env.PASSWORD },
  challenge: true,
  prompt: true,
});

const protectedRoutes = /^\/inventory\/.+\/(create|update)$/;

app.use(protectedRoutes, authMiddleware);

// Set up view engine and static assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Set up middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inventory", inventoryRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
