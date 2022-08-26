import { Request, Response, NextFunction } from "express";
import booru from "booru";

/**
 * Middleware for extracting the options from a GET.
 */
export function ParseGet(req: Request, res: Response, next: NextFunction) {
  if (req.query.tags && typeof req.query.tags === "string") {
    res.locals.tags = req.query.tags.split(",");
  }
  res.locals.booru = (req.query.booru as string) ?? "sb";
  next();
}

/**
 * Middleware for extracting the options from a POST.
 */
export function ParsePost(req: Request, res: Response, next: NextFunction) {
  res.locals.tags = req.body.tags;
  res.locals.booru = (req.body.booru as string) ?? "sb";
  next();
}
/**
 * Searches the booru for an image to return.
 * @param _req Express request (not used)
 * @param res Node Response
 */
export function Search(_req: Request, res: Response) {
  booru
    .search(res.locals.booru, res.locals.tags, { random: true, limit: 1 })
    .then(async (post) => {
      const imageURL = post[0]?.fileUrl as string;
      const type = imageURL.split(".").pop()?.replace("jpg", "jpeg");
      res.setHeader("content-type", `image/${type}`);

      const img = await fetch(imageURL)
        // Turn the image into an ArrayBuffer (which is also a Promise)
        .then(async (fetchRes) => {
          return fetchRes?.arrayBuffer();
        })
        .catch((err: Error) => {
          console.error(err);
          res.status(500).json({ msg: "Wife machine broke", error: err });
        });

      res.status(200).end(Buffer.from(img as ArrayBuffer), "binary");
    })
    .catch((err: Error) => {
      res.status(500).json({ msg: "WaaS Error", error: err });
      console.error(err);
    });
}
