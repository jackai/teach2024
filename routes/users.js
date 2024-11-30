var express = require('express');
var router = express.Router();
const argon2 = require('argon2');

/* 顯示登入頁面 */
router.get('/login', function(req, res, next) {
  const message = req.query?.message;

  res.render('users/login', { title: 'Express', message });
});

/* 送出登入頁面 */
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  const [rows,fields] = await mysql.execute('SELECT * FROM `user` WHERE username = ?', [username]);

  if (rows.length != 1) {
    return res.redirect('/users/login?message=帳號或密碼錯誤');
  }

  const user = rows[0];

  if (!await argon2.verify(user.password, password)) {
    return res.redirect('/users/login?message=帳號或密碼錯誤');
  }

  res.cookie('account', user.account, {signed: true});
  res.cookie('user_id', user.id, {signed: true});
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('user/register', { title: '註冊' });
});

router.post('/register', async function(req, res, next) {
  const { username, password, name } = req.body;
  const hashedPassowrd = await argon2.hash(password);

  const [rows,fields] = await mysql.execute('INSERT INTO `user` (username, password) VALUES (?, ?, ?)', [username, hashedPassowrd]);

  if(rows !== 1) {
    return res.redirect('/?message=註冊失敗');
  }

  res.redirect('/?message=註冊成功');
});


module.exports = router;
