"use strict";

var express = require("express");

var app = express();

var database = require("./configdatabase/index");

var morgan = require("morgan");

var dotenv = require("dotenv").config();

var cors = require("cors");

var useRoute = require("./routes/userRoute");

var tourRoute = require("./routes/tourRoute");

var PORT = process.env.PORT || 3000;

if (dotenv.error) {
  throw dotenv.error;
}

database.connect();
app.disable("x-powered-by");
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({
  limit: "30mb",
  extended: true
}));
app.use(cors()); // app.use((req, res, next) => {
//     const err = new Error("Not Found")
//     err.status = 404
//     next(err)
// })
// app.get("/", (req, res) =>{
//     res.send("HELLO WORLD")
// })

app.use("/users", useRoute);
app.use("/tour", tourRoute);
app.listen(PORT, function () {
  console.log("SERVER IS RUNNING..".concat(PORT, "....."));
});