const search = require("./helpers/API");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  main();
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

function main() {
  (async () => {
    await search.search();
  })();
}
