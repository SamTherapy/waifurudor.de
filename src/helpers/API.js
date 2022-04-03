const got = require("got");
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
      got(queryUrl)
        .then((response) => {
          const jsonRes = JSON.parse(response.body);
          const randPost = Math.floor(Math.random() * jsonRes.length);
          const postID = jsonRes[randPost].id;

          getPost(postID);
        })
        .catch((error) => {
          console.error("error", error);
        });
    } else {
      let queryUrl = `https://${config.booru}.donmai.us/posts.json?tags=${config.tags}&z=1`;
      got(queryUrl)
        .then((response) => {
          const jsonRes = JSON.parse(response.body);
          const randPost = Math.floor(Math.random() * jsonRes.length);
          const postID = jsonRes[randPost].id;

          getPost(postID);
        })
        .catch((error) => {
          console.error("error", error);
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
    got(`https://${config.booru}.donmai.us/posts/${postID}.json`)
      .then((response) => {
        let jsonRes = JSON.parse(response.body);
        (async () => {
          await downloadFromBooru.downloadFromBooru(
            jsonRes.file_url,
            "./src/public/assets/waifu.png"
          );
        })();
      })
      .catch((error) => {
        console.error("Cannot display waifu: ", error);
      });
  });
}

module.exports = { search };
