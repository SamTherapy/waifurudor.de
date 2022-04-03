const request = require("request");
const parseConfig = require("./config");

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

        console.log(body.id);
        console.log(body.created_at);
        console.log(body.rating);
        console.log(body.large_file_url);
      }
    );
  });
}

module.exports = { search };
