
var stringFormUtils = require('string-form-utils');
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/slack', function (req, res) {
  var vw = stringFormUtils.transformToFullwidth(req.body.text || '')
  res.send(vw);
});

app.get('/', function(req, res) {
  res.send('OK');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('Example app listening on post :%s', port);
});