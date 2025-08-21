// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// request header parser API
app.get("/api/whoami", function (req, res) {
  // x-forwarded-for may contain a list of IPs if proxied; take the first one
  const forwardedFor = req.headers["x-forwarded-for"];
  const ipaddress = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : req.ip || req.connection.remoteAddress;

  // accept-language header may contain multiple values; take the first
  const acceptLanguage = req.headers["accept-language"];
  const language = acceptLanguage ? acceptLanguage.split(",")[0] : "";

  // user-agent header contains software info
  const software = req.headers["user-agent"] || "";

  res.json({ ipaddress: ipaddress, language: language, software: software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
