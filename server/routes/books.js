var express = require('express');
var router = express.Router();
var bookList = [
  { title: 'Rogue Lawyer', author: 'John Grisham'},
  { title: 'The Girl on the Train', author: 'Paula Hawkins'},
  { title: 'Scandalous Behavior', author: 'Stuart Woods'},
  { title: 'Blue', author: 'Danielle Steel'},
  { title: 'NYPD Red 4', author: 'James Patterson and Marshall Karp'},
  { title: 'Brotherhood In Death', author: 'J. D. Robb'},
  { title: 'Morning Star', author: 'Pierce Brown'},
];

router.get('/', function(req, res){
  res.send(bookList);
});

router.post('/new', function(req, res){
  var newBook = req.body;
  bookList.push(newBook);
  res.sendStatus(200);
});

module.exports = router;
