var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
    var data = {
        page   : 'user',
        site   : 'pc',
        header : true,
        footer : true,
        request_urls : false

    };
    res.render('layouts/layout', data);

});

//-------用户名更改--------
router.post('/nameEditorData', function (req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'luuker'
    });

    connection.query("UPDATE user SET name = '" + user.name + "'WHERE user_id = '1'", function (err, rows, fields) {
        res.json({
            msg : user.name
        });
    });

    connection.end();
})


router.post('/showUserName', function (req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'luuker'
    });

    connection.query("SELECT * FROM user WHERE user_id = '1'", function (err, rows, fields) {
        res.json({msg: rows[0].name});
    });

    connection.end();
});


//-----------显示游记-------------

router.post('/showUserArticle', function (req, res, next) {
    var article = req.body.article;

    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'luuker'
    });

    connection.query("SELECT * FROM article WHERE article_id = '3'", function (err, rows, fields) {
        res.json({msg: rows[0].name});
    });

    connection.end();
});


//------------登陆动作------------

router.post('/login', function(req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'luuker'
    });

    connection.query("SELECT * FROM user WHERE name = '" + user.name + "'", function(err, rows, fields) {
        if(err) throw err;

        if(rows.length > 0) {
            if(user.name == rows[0].name && user.pwd == rows[0].password) {
                req.session.user = rows[0];

                res.json({
                    msg : rows[0].name
                });
            } else {
                res.json({
                    msg : 'failed'
                });
            }
        }
    });

    connection.end();


});

router.post('/join', function(req, res, next) {
    var new_user = req.body.new_user;

    var connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'luuker'
    });

    connection.query("INSERT INTO user (name, password) VALUES ('" + new_user.name + "','" + new_user.pwd + "')", function(err, result) {
        if(err) throw err;
        res.json({
            msg      : 'success',
            new_user : new_user
        })
    });

    connection.end();
});

module.exports = router;

//------------修改前台密码---------------

router.post('/changePwd', function (req, res, next) {
    var pwd = req.body.user

    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'luuker'
    });

    connection.query("UPDATE user SET password = '" + pwd.npwd1 + "' WHERE user_id = '1'", function (err, rows, fields) {
        console.log(1)
        res.json({msg: 'success'});
    });

    connection.end();

})