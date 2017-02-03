var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.hbs', {
    userName: 'Brad',
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my website!',
  })
});

module.exports = router;
