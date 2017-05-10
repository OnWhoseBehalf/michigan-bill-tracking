const express = require('express');
const mongoose = require('mongoose');

module.exports = function routes(app) {
  mongoose.connect('mongodb://localhost/test');
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log('connected to db');
  });

  app.get('/', function (req, res) {
    res.send('{ "fake": "fake bill data" }');
  });
}
