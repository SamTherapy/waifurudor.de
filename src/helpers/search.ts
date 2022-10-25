import { Request, Response } from "express";
import * as booru from "booru";
import ContentType from "./contentType.js";

/**
 * Searches the booru for an image to return.
 * @param _req Express request (not used)
 * @param res Node Response
 */
export default async function Search(_req: Request, res: Response) {
  const posts = await booru
    .search(res.locals.booru, res.locals.tags, { random: true, limit: 1 })
    .catch((err: Error) => {
      res.status(400).json({ msg: "WaaS Error", error: err });
      console.error(err);
    });

  const imageURL = (posts as booru.SearchResults)[0]?.fileUrl as string;

  const type = imageURL?.split(".")?.pop() as string;
  if (type == null) {
    res.status(404).json({ msg: "No results found"})
  }
  res.setHeader("content-type", ContentType(type));

  const img = await fetch(imageURL)
    // Turn the image into an ArrayBuffer (which is also a Promise)
    .then(async (fetchRes) => {
      return fetchRes?.arrayBuffer();
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).json({ msg: "Wife machine broke", error: err });
    });

  // deepcode ignore XSS: nmp
  res.status(200).end(Buffer.from(img as ArrayBuffer), "binary");
}
