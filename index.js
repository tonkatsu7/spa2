var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var axios = require('axios');
var FormData = require('form-data');
var Buffer = require('buffer').Buffer;

require('dotenv').config();

console.log('API_KEY=' + process.env.MAILGUN_API_KEY);
console.log('FROM=' + process.env.MAILGUN_FROM_ACCOUNT);
console.log('MG_DOMAIN=' + process.env.MAILGUN_DOMAIN_NAME);
console.log('MAILGUN_BASE_URL=' + process.env.MAILGUN_BASE_URL);
console.log('MAILGUN_AUTH_TOKEN=' + process.env.MAILGUN_AUTH_TOKEN);

// var mailgun = require('mailgun-js')({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN_NAME
// });

var bodyParser = require('body-parser');
app.use( bodyParser.json() );

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

var instance = axios.create({
  baseURL: process.env.MAILGUN_BASE_URL,
  headers: { 'Authorization': 'Basic ' + new Buffer('api:' + process.env.MAILGUN_API_KEY).toString('base64') }
});

app.post('/send/', function(req, res) {
  console.log(JSON.stringify(req.body));

  // var mgData = {
  //   from: process.env.MAILGUN_FROM_ACCOUNT,
  //   to: req.body.to,
  //   subject: req.body.subject,
  //   text: req.body.message
  // };
  //
  // mailgun.messages().send(mgData, function (error, body) {
  //   console.log('RESULT=' + JSON.stringify(body));
  // });

  const url = 'messages';
  const formData = new FormData();

  var response;

  formData.append('from', process.env.MAILGUN_FROM_ACCOUNT);
  formData.append('to', req.body.to);
  formData.append('subject', req.body.subject);
  formData.append('text', req.body.message);

  instance.post(url, formData, {
    headers: formData.getHeaders()
  })
    .then(function (result) {
    console.log('Successfully sent email: ' + result);
    res.send(result);
  })
    .catch(function (error) {
    console.log('Failed to send email: ' + error);
    console.error(error.stack);
    res.sendStatus(500);
  });
});

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  require('reload')(app);
}

server.listen(process.env.PORT, function () {
  console.log('Listening on port '.concat(process.env.PORT))
});