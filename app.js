const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const MONGODB_URI =
  "mongodb+srv://karim:GSkHPKNMo64wzgb4@cluster0.fjr5qww.mongodb.net/Social-App";

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// app.use("/images", express.static(path.join(__dirname, "images"))); // to serve image folder !!

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const server = app.listen(8080);
    console.log("Client connected :)");
    const io = require("./socket").init(server);
    io.on("connection", (Socket) => {});
  })
  .catch((err) => {
    console.log(err + " !!!!connection failed!!!! ");
  });
