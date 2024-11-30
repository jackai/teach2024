var express = require('express');
var router = express.Router();
var { promisePool: mysql } = require('../lib/mysql');
const argon2 = require('argon2');

/* 顯示登入頁面 */
router.get('/login', function(req, res, next) {
  const message = req.query?.message;

  res.render('users/login', { title: 'Express', message });
});

/* 送出登入頁面 */
router.post('/login', async function(req, res, next) {
  const [rows,fields] = await mysql.execute(
    'SELECT id, password FROM users WHERE account = ?', 
    [req.body.account]
  );

  if (rows.length === 0) {
    return res.redirect('/users/login?message=登入失敗');
  }

  const login = await argon2.verify(rows[0].password, req.body.password);

  if (!login) {
    return res.redirect('/users/login?message=登入失敗');
  }
  
  res.cookie('user_id', rows[0].id, {signed: true});
  res.cookie('account', rows[0].account, {signed: true});
  res.redirect('/');
});

/* 顯示註冊頁面 */
router.get('/regist', function(req, res, next) {
  const message = req.query?.message;

  res.render('users/regist', { title: 'Express', message });
});

/* 送出註冊頁面 */
router.post('/regist', async function(req, res, next) {
  const hash_password = await argon2.hash(req.body.password);

  const [rows,fields] = await mysql.execute(
    'INSERT INTO users (account, password) VALUES (?,?)', 
    [req.body.account, hash_password]
  );

  if (rows.affectedRows === 1) {
    return res.redirect('/users/login?message=註冊成功');
  }

  return res.redirect('/users/regist?message=註冊失敗');
});

module.exports = router;
