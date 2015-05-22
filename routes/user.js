var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql_option = require('../config/database.js');

router.get('/', function(req, res, next) {

    var data = {
        page         : 'user',
        site         : 'pc',
        header       : true,
        footer       : true,
        request_urls : false

    };
    res.render('layouts/layout', data);

});

//-------用户名更改--------
router.post('/nameEditorData', function(req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection(mysql_option);

    connection.query("UPDATE user SET name = '" + user.name + "'WHERE user_id = '1'", function(err, rows, fields) {
        res.json({
            msg : user.name
        });
    });

    connection.end();
})

router.post('/showUserName', function(req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection(mysql_option);

    connection.query("SELECT * FROM user WHERE user_id = '1'", function(err, rows, fields) {
        res.json({ msg : rows[0].name });
    });

    connection.end();
});

//-----------显示游记------------
router.post('/showUserArticle', function(req, res, next) {
    var article = req.body.user;

    var connection = mysql.createConnection(mysql_option);

    connection.query("SELECT * FROM article WHERE article_id = '3'", function(err, rows, fields) {
        res.json({ msg : rows[0].name });
    });

    connection.end();
});

//------------登陆动作------------
router.post('/login', function(req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection(mysql_option);

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

    var connection = mysql.createConnection(mysql_option);

    connection.query("INSERT INTO user (name, password) VALUES ('" + new_user.name + "','" + new_user.pwd +
                     "')", function(err, result) {
        if(err) throw err;
        res.json({
            msg      : 'success',
            new_user : new_user
        })
    });

    connection.end();
});

//------------登出动作------------
router.get('/log_out', function (req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

//------------修改前台密码---------------
router.post('/changePwd', function(req, res, next) {
    var pwd = req.body.user

    var connection = mysql.createConnection(mysql_option);

    connection.query("UPDATE user SET password = '" + pwd.npwd1 + "' WHERE user_id = '1'", function(err, rows, fields) {
        res.json({ msg : 'success' });
    });

    connection.end();

});

router.post('/uploadHeadImage', function(req, res) {
    var image = req.files;
    var user = req.session.user;

    var connection = mysql.createConnection(mysql_option);
    connection.query("UPDATE user SET img = '" + image.upload.path.slice(5) +
                     "' WHERE user_id = " + user.user_id, function(err, result) {
        if(err) throw err;
        console.log(111);
        res.json({ msg : 'success' });
    });
    connection.end();
});

//------------显示邮箱学校--------------
router.post('/showUserTxt', function(req, res, next) {
    var txt = req.body.user;

    var connection = mysql.createConnection(mysql_option);

    connection.query("SELECT * FROM user WHERE user_id = '1'", function(err, rows, fields) {
        res.json({
            mail   : rows[0].mail,
            school : rows[0].school
        })
    });
    connection.end();
});

//------------更新资料------------------
router.post('/changeTxt', function(req, res, next) {
    var txt = req.body.user

    var connection = mysql.createConnection(mysql_option);

    connection.query("UPDATE user SET mail = '" + txt.nmail + "', school = '" + txt.nschool + "' WHERE user_id = '1'", function(err, rows, fields) {
        res.json({ msg : 'success' });
    });
    connection.end();
});

module.exports = router;
