var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wines and Shit' });
});

// *** database *** //
var connectionString = 'postgres://localhost:5432/wines';

// *** db routes *** //

  // *** get all the wines *** //
  router.get('/api/wines', function(req, res, next) {

    var responseArray = [];

    pg.connect(connectionString, function (err, client, done) {

      if(err) {
        done();
        return res.status(500).json({status: 'error', message: 'Something went wrong'});
      }
      //query the db
      var query = client.query('SELECT * from wineTable');
      // get all rows
      query.on('row', function(row) {
        responseArray.push(row);
      });
      query.on('end', function() {
        res.json(responseArray);
        done();
      });
      pg.end();
    });
  });

  // *** add a wine *** //
  router.post('/api/wines', function(req, res, next) {
    var newWine = req.body;

    pg.connect(connectionString, function(err, client, done) {

      if(err) {
        done();
        return res.status(500).json({status: 'error', message:'Well. Shit.'});
      }
      //insert into the db
      var query = client.query("INSERT INTO wineTable (name, rating, notes, price, region) VALUES ('" + newWine.name + "','" + newWine.rating + "','" + newWine.notes + "','" + newWine.price + "','" + newWine.region + "');");
      //get all rows
      query.on('row', function(row) {
        responseArray.push(row);
      });
      //send date back as json
      query.on('end', function() {
        res.json({status: 'success', message: 'Added some more wine booze.'});
        done();
      });
      //close the connection
      pg.end();
  });
});


  module.exports = router;
