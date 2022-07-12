console.log("it works");
// #0 IMPORT DEPS
const PORT = process.env.PORT || 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const cors = require("cors");
const pretty = require("pretty");

const app = express();
app.use(cors());

// #1 SETUP PATH
app.get("/", (req: any, res: any) => {
  res.json(`Welcome to the API interface ${(() => `:`)()} ${new Date()}`);
});

// #3 SETUP SERVER TASKS
const url = `https://jsonplaceholder.typicode.com/`;

axios.get(url).then((response: { data: any }) => {
  const html = response.data;
  // console.log(pretty(html));

  const $ = cheerio.load(html);

  $('a:contains("sponsor")', html).each(function (this: any) {
    const title = $(this).text();
    console.log(pretty(title));
    const url = $(this).attr("href");
    console.log(pretty(url));
  });
});

// #2 PORT LISTEN
app.listen(PORT, () => {
  console.log(`server running ar http://localhost:${PORT}`);
});
