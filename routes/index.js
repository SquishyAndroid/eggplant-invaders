var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.hbs')
});

/* GET home page. */
router.get('/game', function (req, res, next) {
  res.render('game.hbs')
});

module.exports = router;
