/**
 * Created by cola on 15-5-13.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------后台主页页面渲染-------
router.get('/', function(req, res, next) {
    if(req.session.user == null){
        res.redirect('/backstage/sign_in');
    }else{
        var data = {
            page   : 'home',
            site   : 'backstage',
            header : true,
            user   : req.session.user
        };
    }
    res.render('layouts/layout_backstage', data);
});

//------登陆页面渲染----------
router.get('/sign_in', function(req, res, next) {
    var data = {
        page   : 'sign_in',
        site   : 'backstage',
        header : false
    };
    res.render('layouts/layout_backstage', data);
});

//------模块管理页面渲染------
router.get('/editor', function(req, res, next) {
    if(req.session.user == null){
        res.redirect('/backstage/sign_in');
    }else{
        var data = {
            page   : 'editor',
            site   : 'backstage',
            header : true,
            user   : req.session.user
        };
    }



    res.render('layouts/layout_backstage', data);
});

//------首页头图更改动作------
router.post('/changeHomeBanner',function(req, res, next) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'luuker'
    });

    connection.query("SELECT * FROM geadimg WHERE id = '1'", function(err, rows, fields) {
        console.log(rows)
        if(err) throw err;
        if(rows.length > 0) {
            res.json({ msg : 'success' });
        } else {
            res.json({ msg : 'null' });
        }
    });

    connection.end();
});

//------登陆动作-------------
router.post('/sign_in', function(req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'luuker'
    });

    connection.query("SELECT * FROM admin WHERE name = '" + user.name + "'", function(err, rows, fields) {
        if(err) throw err;
        if(rows.length > 0) {
            if(user.name == rows[0].name && user.pwd == rows[0].password) {
                req.session.user = rows[0];
                res.json({ msg : 'success' });
            } else {
                res.json({ msg : 'failed' });
            }
        } else {
            res.json({ msg : 'null' });
        }
    });

    connection.end();
});

//------登出动作-------------
router.get('/sign_out', function(req, res, next){
    req.session.user = null;
    res.redirect('/backstage/sign_in');
});

//------修改密码动作---------
router.post('/change_pwd', function(req, res, next){
     var pwd = req.body.user
     var user = req.session.user

     var connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'luuker'
    });  

    connection.query("UPDATE admin SET password = '" + pwd.pwd_new_1 + "'", function(err, rows, fields) {
        res.json({ msg : 'success' });
    });

    connection.end();

})

module.exports = router;