const fs = require("fs");
const { promisify } = require("util");
const got = require("got");
const stream = require("stream");

const pipeline = promisify(stream.pipeline);

async function downloadFromBooru(url, filepath) {
  await pipeline(got.stream(url), fs.createWriteStream(filepath));
}

module.exports = { downloadFromBooru };
