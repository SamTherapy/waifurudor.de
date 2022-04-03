const fs = require("fs");
const client = require("https");

function downloadFromBooru(url, filepath) {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on("error", reject)
          .once("close", () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request failed with status code: ${res.statusCode}`));
      }
    });
  });
}

module.exports = { downloadFromBooru };
