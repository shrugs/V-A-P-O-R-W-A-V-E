
var EMOJI_REGEX = /:[\w\-\_]+:/g;

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

  var indexShift = 0;
  var m, matches = [];
  while (m = EMOJI_REGEX.exec(inputString)) {
    m.shiftIndex = m.index - indexShift;
    indexShift += m[0].length;
    matches.push(m);
  }
  inputString = inputString.split('');
  matches.forEach(function(match) {
    inputString.splice(match.shiftIndex, match[0].length)
  })

  var vw = stringFormUtils.transformToFullwidth(inputString.join(''))
  matches.forEach(function(match) {
    vw = vw.insertAt(match.index, match[0])
  })

  res.json({
    response_type: 'in_channel',
    text: vw,
  });
});

app.get('/', function(req, res) {
  res.send('OK');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('Example app listening on post :%s', port);
});
