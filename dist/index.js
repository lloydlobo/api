"use strict";
console.log("it works");
var PORT = process.env.PORT || 8000;
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var cors = require("cors");
var pretty = require("pretty");
var app = express();
app.use(cors());
app.get("/", function (req, res) {
    res.json("Welcome to the API interface ".concat((function () { return ":"; })(), " ").concat(new Date()));
});
var url = "https://jsonplaceholder.typicode.com/";
axios.get(url).then(function (response) {
    var html = response.data;
    var $ = cheerio.load(html);
    $('a:contains("sponsor")', html).each(function () {
        var title = $(this).text();
        console.log(pretty(title));
        var url = $(this).attr("href");
        console.log(pretty(url));
    });
});
app.listen(PORT, function () {
    console.log("server running ar http://localhost:".concat(PORT));
});
