import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { ParseGet, ParsePost } from "./helpers/parse.js";
import Search from "./helpers/search.js";

const app = express();

app.use(helmet());
app.use(morgan("combined"));
// app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

app.use(express.json());

// Errors
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

app.get("/source", (_req, res) => {
  res.redirect(301, "https://git.freecumextremist.com/grumbulon/waifurudor.de");
});

// For 404s
app.use((_req, res) => {
  res.setHeader("content-type", "text/plain");
  res.status(404).send("Nothing beside remains.");
});

export default app;
