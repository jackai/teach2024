var express = require('express');
var router = express.Router();
var { promisePool: mysql } = require('../lib/mysql');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const account = req.signedCookies?.account;
  
  const [rows,fields] = await mysql.execute(
    'SELECT users.account AS account, message, created_at ' +
    'FROM message ' +
    'INNER JOIN `users` ON `users`.`id` = message.user_id ' +
    'ORDER BY message.id DESC LIMIT 10', 
    []
  );

  res.render('message/index', { title: 'Express', account, rows });
});

module.exports = router;
