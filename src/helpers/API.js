const request = require("request");
const parseConfig = require("./config");
const downloadFromBooru = require("./download");

let configFile = "./config.json";

function search() {
  parseConfig.readConfig(configFile, (err, config) => {
    if (err) {
      console.log(err);
      return;
    }

    if (config.rating === "safe") {
      let queryUrl = `https://${config.booru}.donmai.us/posts.json?tags=${config.tags}+rating:${config.rating}&z=1`;
      request(queryUrl, { json: true }, (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        const randPost = Math.floor(Math.random() * body.length);
        const postID = body[randPost].id;
        getPost(postID);
      });
    } else {
      let queryUrl = `https://${config.booru}.donmai.us/posts.json?tags=${config.tags}&z=1`;
      request(queryUrl, { json: true }, (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        const randPost = Math.floor(Math.random() * body.length);
        const postID = body[randPost].id;
        getPost(postID);
      });
    }
  });
}

function getPost(postID) {
  parseConfig.readConfig(configFile, (err, config) => {
    if (err) {
      console.log(err);
      return;
    }
    request(
      `https://${config.booru}.donmai.us/posts/${postID}.json`,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        downloadFromBooru.downloadFromBooru(
          body.file_url,
          "./src/public/assets/waifu.png"
        );
      }
    );
  });
}

module.exports = { search };
