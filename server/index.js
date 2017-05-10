const cluster = require('cluster');
const master = require('./master');
const routes = require('./routes');

if (cluster.isMaster) {
  master(cluster);
} else {
  routes();
}
