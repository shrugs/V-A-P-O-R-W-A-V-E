
var EMOJI_REGEX = /:\w+:/g;

String.prototype.insertAt = function(index, string) {
  return this.substr(0, index) + string + this.substr(index);
}

var stringFormUtils = require('string-form-utils');
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/slack', function (req, res) {
  var inputString = (req.body.text || '');
  var m, matches = [];
  while (m = EMOJI_REGEX.exec(inputString)) {
    matches.push(m);
  }
  inputString = inputString.split('');
  for (var match in matches) {
    inputString.splice(match.index, match[0].length)
  }
  console.log(matches);
  var vw = stringFormUtils.transformToFullwidth(inputString.join(''))
  for (var match in matches) {
    vw.insertAt(match.index, match[0])
  }
  res.send(vw);
});

app.get('/', function(req, res) {
  res.send('OK');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('Example app listening on post :%s', port);
});