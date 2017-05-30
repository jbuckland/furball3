var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  var jsonData = { this: 'is', a: 'json', response: 'object' };
  res.json(jsonData);
})


router.get('/ship', function (req, res, next) {
  
  var jsonData = fs.readFileSync('./app/data/database.json');
  var database = JSON.parse(jsonData);

  var ships = database.Ships;

  res.json(ships);
})

router.get('/ship/add', function (req, res, next) {



})



module.exports = router;
