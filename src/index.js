import { search } from "./helpers/API.js";
import express from "express";

const app = express();
const port = 3000;

app.use("/assets", express.static("src/public/assets"));

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  main();
  res.sendFile("src/public/index.html", { root: "." });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

function main() {
  search();
}
