const express = require('express');
const mongoose = require('mongoose');
const { BillSchema } =  require('../schemas/bill');


// Routes isnt quite the right thing
module.exports = function routes(app) {
  // michiganbillsandlaws
  mongoose.connect('mongodb://localhost/michiganbillsandlaws');
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    const modules = { app, db };

    defineRoutes(modules);
  });


  // Tank.create({ size: 'small' }, function (err, small) {
  //   if (err) return handleError(err);
  //   // saved!
  // })

}

const defineRoutes = ({ app }) => {
  app.get('/bills', function (req, res) {

    BillSchema.find({}).lean().exec(function (err, bills) {
      if (err) {
        return res.send(JSON.stringify({
          error: 'There was an error getting bills',
        }));
      }

      return res.end(JSON.stringify(bills));
    });

  });

  app.post('/bills', function (req, res) {

    BillSchema.create(req.body, function (err, bill) {
      if (err) {
        return res.send(JSON.stringify({
          error: 'There was an error creating bill',
        }));
      }

      res.send(JSON.stringify(bill))
    });
    
  });
};


var kittySchema = mongoose.Schema({
    name: String
});
