console.log("it works");
const PORT = process.env.PORT || 8000;
// #0 IMPORT DEPS
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const pretty = require("pretty");

const app = express();
app.use(cors());

const responses: any = [];

// #1 SETUP PATH
app.get("/", (req: any, res: any) => {
  res.json(`Welcome to the API interface ${(() => `:`)()} ${new Date()}`);
});

// #3 SETUP SERVER TASKS
const url = `https://www.theverge.com/apps/rss/index.xml`;

const getAxios = axios
  .get(url)
  .then((response: { data: any }) => {
    const html = response.data; // console.log(pretty(html));
    // #4 Use cheerio to generate
    const $ = cheerio.load(html, { xmlMode: true }); // https://www.youtube.com/watch?v=2P92j7otn9o // https://zetcode.com/javascript/cheerio/

    const cheerioData = $("entry").each(function (index: any, element: any) {
      const title = $(element).children("title").text().trim();
      const content = $(element).children("content").text().trim();
      // #5 push data
      responses.push({ title: title, content: content });
      return { title: title, content: content };
    });

    const data = cheerioData.text(); // console.log(pretty(data));
    return data;
  })
  .catch(function (err: any) {
    console.error(err);
  });

// Return the data from axios & cheerio processing
(async () => {
  console.log(pretty(await getAxios));
})(); // async I F E E

// #6 Display json on an endpoint
app.get(
  "/api/",
  (req: any, res: { json: (arg0: { title: any; url: any }[]) => void }) => {
    res.json(responses);
  }
);
// #2 PORT LISTEN
app.listen(PORT, () => {
  console.log(`server running ar http://localhost:${PORT}`);
});

// ARCHIVE

// $('a:contains("user")', html).each(function (this: any) { //   const title = $(this).text().trim(); //   const url = $(this).attr("href"); //   // #5 push data // responses.push({ title: title, url: url, }); //   console.log(responses); // }); // // end of $().each
