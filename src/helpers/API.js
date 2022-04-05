import { readConfig } from "./config.js";
import downloadFromBooru from "./download.js";
import { search } from "booru";

let configFile = "./config.json";

export function getFromBooru() {
  readConfig(configFile, (err, config) => {
    if (err) {
      console.log(err);
      return;
    }

    //append safe rating to the tags if so desired
    if (config.rating === "safe") {
      config.tags.push("rating:safe");
    }

    //Select a random index from the array and append the waifu to the tags
    const randWaifu = Math.floor(Math.random() * config.characterTags.length);
    config.tags.push(config.characterTags[randWaifu]);

    //Select a random index from the array to pick which booru is being queried
    const randBooru = Math.floor(Math.random() * config.booru.length);
    search(config.booru[randBooru], config.tags, {
      limit: 1,
      random: true,
    }).then((response) => {
      if (response.length === 0) {
        console.log("Error searching for posts.", Error("No posts found."));
        return;
      }

      const post = response[0];

      (async () => {
        await downloadFromBooru(post.fileUrl, "./src/public/assets/waifu.png");
      })();
    });
  });
}
