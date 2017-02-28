var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi', //env var: PGDATABASE
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM books', function(errorRunningDatabseQuery, databaseResult){
        done();
        if(errorRunningDatabseQuery) {
          console.log('error', errorRunningDatabseQuery);
          res.sendStatus(500);
        } else {
          res.send(databaseResult.rows);
        }
      });
    }
  });
});

router.post('/new', function(req, res){
  var newBook = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO books (title, author) VALUES ($1, $2)',
        [newBook.title, newBook.author],
        function(errorRunningDatabseQuery, databaseResult){
        done();
        if(errorRunningDatabseQuery) {
          console.log('error', errorRunningDatabseQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
