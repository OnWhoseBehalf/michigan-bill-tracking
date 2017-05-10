const cluster = require('cluster');
const master = require('./master');
const routes = require('./routes');
const express = require('express');

if (cluster.isMaster) {
  master(cluster);
} else {
  const app = express();

  routes(app);

  app.listen(3000, function () {
    console.log('App listening on port 3000!');
  });
}
