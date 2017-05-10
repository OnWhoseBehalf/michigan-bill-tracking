const WORKERS = process.env.WEB_CONCURRENCY || 1;

module.exports = function master(cluster) {
  // Fork workers.
  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
}
