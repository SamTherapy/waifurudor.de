const search = require("./helpers/API");
var serveStatic = require("serve-static");
const express = require("express");

const app = express();
const port = 3000;

app.use(
  serveStatic("src/public", {
    maxAge: "1d",
  })
);
app.get("/", (req, res) => {
  main();
});
function doCache(res, durationSecs) {
  res.set({
    "Cache-Control": "max-age=" + durationSecs,
  });
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

async function main() {
  search.search();
}
main();
