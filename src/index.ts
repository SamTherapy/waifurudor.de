import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { ParseGet, ParsePost, Search } from "./helpers/booruSearch.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

app.use(express.json());

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Wife machine broke", error: err });
});

app
  .route("/")
  .get(ParseGet, Search)
  .post(ParsePost, Search)
  // Also have a fallback for anyone who tries to be silly :)
  .all((_req, res) => {
    res.set("ALLOW", "GET, POST");
    res.status(405).json({ msg: "Method not allowed." });
  });

// Politely tell all crawlers to go away since there's nothing here.
app.get("/robots.txt", (_req, res) => {
  res.setHeader("content-type", "text/plain");
  res.status(200).send(`User-agent: *
Disallow: /`);
});

// For 404s
app.use((_req, res) => {
  res.setHeader("content-type", "text/plain");
  res.status(404).send("Nothing beside remains.");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
