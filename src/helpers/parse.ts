import { Request, Response, NextFunction } from "express";

/**
 * Middleware for extracting the options from a GET.
 *
 * Why not just support JSON for both GET and POST requests?
 * Don't wanna.
 */
export function ParseGet(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.query.tags && typeof req.query.tags === "string") {
    res.locals.tags = req.query.tags.split(",");
  }
  res.locals.booru = (req.query.booru as string) ?? "sb";
  next();
}

/**
 * Middleware for extracting the options from a POST.
 *
 * Accepts from the body only because.
 */
export function ParsePost(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.locals.tags = req.body.tags;
  res.locals.booru = (req.body.booru as string) ?? "sb";
  next();
}
