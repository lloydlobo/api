console.log("it works");
// #0 IMPORT DEPS
const PORT = process.env.PORT || 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const cors = require("cors");

const app = express();
app.use(cors());

// #1 SETUP PATH
app.get("/", (req: any, res: any) => {
  res.json(`Welcome to the API interface ${(() => `:`)()} ${new Date()}`);
});
// SETUP SERVER TASKS

// #2 PORT LISTEN
app.listen(PORT, () => {
  console.log(`server running ar http://localhost:${PORT}`);
});
