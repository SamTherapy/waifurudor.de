const search = require("./helpers/API");
const serveStatic = require("serve-static");
const express = require("express");
const path = require('path');
const router = express.Router();


const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const options = {
  headers: {
    'Cache-Control': 'no-cache',
  }
};

//app.use(express.static('./src/public'));
app.use("/", router)
router.get("/", (req, res) => {
  res.send(main());
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

async function main() {
  search.search();
}
