const express = require('express');
const app = express();
const request = require('request');
const port = 3000;


function handleRedirect(req, res) {
  let options = {
    url: 'https://haveibeenpwned.com' + req.originalUrl,
    headers: {"User-Agent": "PWN-checker"}
  };
  res.set('User-Agent', 'PWN-checker');
  request(options).pipe(res);
}

app.get('*', handleRedirect);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


