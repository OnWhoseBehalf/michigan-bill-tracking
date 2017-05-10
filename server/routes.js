const express = require('express');
module.exports = function routes() {
  const app = express();

  app.get('/', function (req, res) {
    res.send('{ "fake": "fake bill data" }');
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}
