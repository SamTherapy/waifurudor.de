import { getFromBooru, userDefinedTags } from "./helpers/API.js";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  getFromBooru();
  res.sendFile("src/public/assets/waifu.png", { root: "." });
});

app.get("/waifu", (req, res) => {
  const tags = req.query.tags.split(",");
  userDefinedTags(tags);
  res.sendFile("src/public/assets/waifu.png", { root: "." });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
