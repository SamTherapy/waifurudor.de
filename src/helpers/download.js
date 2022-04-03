import got from "got";
import { createWriteStream } from "fs";
import { promisify } from "util";
import { pipeline as _pipeline } from "stream";

const pipeline = promisify(_pipeline);

export default async function downloadFromBooru(url, filepath) {
  await pipeline(got.stream(url), createWriteStream(filepath));
}
