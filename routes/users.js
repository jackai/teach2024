var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  const message = req.query?.message;

  res.render('users/login', { title: 'Express', message });
});

/* GET home page. */
router.post('/login', function(req, res, next) {
  console.log({
    body: req.body,
    cookie: req.cookies,
  });

  const accounts = [
    {
      account: 'test',
      password: '123456',
    },
    {
      account: 'test2',
      password: '123456',
    },
  ];

  const login = accounts.find((account) => {
    return account.account === req.body.account && account.password === req.body.password;
  });

  if (login) {
    res.cookie('account', req.body.account, {signed: true});
    res.redirect('/');
  }

  if (!login) {
    res.redirect('/users/login?message=登入失敗');
  }
});

module.exports = router;
