const request = require("request");
const parseConfig = require("./config");
const downloadFromBooru = require("./download");

function search() {
  let configFile = "./config.json";
  parseConfig.readConfig(configFile, (err, config) => {
    if (err) {
      console.log(err);
      return;
    }
    request(
      `https://${config.booru}.donmai.us/posts/6.json`,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        console.log(body)
        downloadFromBooru.downloadFromBooru(body.large_file_url, `./img/${body.id}.png`)

      }
    );
  });
}

module.exports = { search };
