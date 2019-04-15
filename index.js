var EMOJI_REGEX = /:[\w\-\_]+:/g;

String.prototype.insertAt = function(index, string) {
  return this.substr(0, index) + string + this.substr(index);
};

const stringFormUtils = require("string-form-utils");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("*", (req, res) => {
  console.log(req.body);

  if (req.body == null) {
    return res.status(400).send({ error: "no JSON object in the request" });
  }

  if (req.body.token !== process.env.SLACK_TEAM_TOKEN) {
    return res.status(400).send({ error: "you're not hackNY!" });
  }

  var inputString = req.body.text || "";

  var indexShift = 0;
  var m,
    matches = [];
  while ((m = EMOJI_REGEX.exec(inputString))) {
    m.shiftIndex = m.index - indexShift;
    indexShift += m[0].length;
    matches.push(m);
  }
  inputString = inputString.split("");
  matches.forEach(function(match) {
    inputString.splice(match.shiftIndex, match[0].length);
  });

  var vw = stringFormUtils.transformToFullwidth(inputString.join(""));
  matches.forEach(function(match) {
    vw = vw.insertAt(match.index, match[0]);
  });

  res.json({
    response_type: "in_channel",
    text: vw,
  });
});

app.all("*", (req, res) => {
  res.status(405).send({ error: "only POST requests are accepted" });
});

module.exports = app;
