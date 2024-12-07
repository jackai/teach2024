var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const account = req.signedCookies?.account;

  console.log({account, cookie: req.signedCookies});

  res.render('index', { title: 'Express', account });
});

module.exports = router;
