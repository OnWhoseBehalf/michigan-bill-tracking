const cluster = require('cluster');
const master = require('./master');
const routes = require('./src/routes');
const express = require('express');
const bodyParser = require('body-parser');

if (cluster.isMaster) {
  master(cluster);
} else {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  routes(app);

  app.listen(3000, function () {
    console.log('App listening on port 3000!');
  });
}
