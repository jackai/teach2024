var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Express' });
});

/* GET home page. */
router.post('/login', function(req, res, next) {
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;
