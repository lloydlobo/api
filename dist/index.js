"use strict";
console.log("it works");
var PORT = process.env.PORT || 8000;
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var cors = require("cors");
var app = express();
app.use(cors());
app.get("/", function (req, res) {
    res.json("Welcome to the API interface ".concat((function () { return ":"; })(), " ").concat(new Date()));
});
app.listen(PORT, function () {
    console.log("server running ar http://localhost:".concat(PORT));
});
