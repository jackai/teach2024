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

router.post('/create', async function(req, res, next) {
    const user_id = req.signedCookies?.user_id;
    const message = req.body?.message;

    const [rows,fields] = await mysql.execute(
        'INSERT INTO message (user_id, message, created_at) VALUES (?, ?, NOW())', 
        [user_id, message]
    );

      
    if (rows.affectedRows === 1) {
        return res.redirect('/message');
    }
    
    return res.redirect('/message?message=留言失敗');
});

module.exports = router;
