const request = require('request');


request('https://testbooru.donmai.us/posts/6.json', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.id);
  console.log(body.created_at);
  console.log(body.rating);
  console.log(body.large_file_url)
});
