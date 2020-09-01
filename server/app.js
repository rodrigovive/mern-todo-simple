const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
const routerApi = require("./router/api");

require("dotenv").config();

const uri = process.env.DB_URI;
const app = express();
const clientPath = path.join(__dirname, "../client/build");

const port = process.env.PORT || 3000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("opne", () => {
  console.log("MONGO db database connection established succ");
});

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(clientPath));
  app.get("*", (_, res) => {
    res.sendFile(clientPath + "index.html");
  });
}

app.use("/api", routerApi);

app.use(function (_, __, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Server is running is ${port}`);
});
