import { readConfig } from "./config.js";
import downloadFromBooru from "./download.js";
import Booru from 'booru';


let configFile = "./config.json";

export function getFromBooru() {
  readConfig(configFile, (err, config) => {
    if (err) {
      console.log(err);
      return;
    }
    const randBooru = Math.floor(Math.random() * config.booru.length);
    Booru.search(config.booru[randBooru], config.tags, { limit: 1, random: true }).then(
      (posts) => {
        (async () => {
          await downloadFromBooru(
            posts[0].fileUrl,
            "./src/public/assets/waifu.png"
          );
        })();
      }
    );
  });
}