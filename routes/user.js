var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql_option = require('../config/database.js');

router.get('/', function(req, res, next) {
    if(!req.session.user) {
        res.redirect('../');
    }else{
        var data = {
            page         : 'user',
            site         : 'pc',
            header       : true,
            footer       : true,
            request_urls : false,
            user         : req.session.user ? req.session.user : false
        };
        res.render('layouts/layout', data);
    }
});


//------------登陆动作------------
router.post('/login', function(req, res) {
    var user = req.body.user;

    var connection = mysql.createConnection(mysql_option);
    connection.query("SELECT * FROM user WHERE name = '" + user.name + "'", function(err, rows) {
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

router.post('/join', function(req, res) {
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
router.get('/log_out', function(req, res) {
    req.session.user = null;
    res.redirect('/');
});

//------------修改前台密码---------------
router.post('/changePwd', function(req, res) {
    var pwd = req.body.user
    var user = req.session.user;

    var connection = mysql.createConnection(mysql_option);

    connection.query(" SELECT * FROM user WHERE user_id = " + user.user_id, function(err, rows, fields){
        if(err) throw err;
        if(pwd.opwd != rows[0].password){
            res.json({ msg : 'wrong' });
        }else{
            connection.query("UPDATE user SET password = '" + pwd.npwd1 + "' WHERE user_id = " + user.user_id, function(err, rows, fields) {
                console.log(pwd.npwd1)
                res.json({ msg : 'success' });
                connection.end();
            });
        }
    });



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

//------------更新资料--------------------------------------------------
router.post('/changeTxt', function(req, res) {
    var txt = req.body.user;
    var user = req.session.user;

    var connection = mysql.createConnection(mysql_option);
    connection.query("UPDATE user SET mail = '" + txt.nmail + "', school = '" + txt.nschool +
                     "' WHERE user_id = " + user.user_id, function(err, rows) {
        res.json({ msg : 'success' });
    });
    connection.end();
});

router.all('/getUserData', function(req, res) {
    var user = req.session.user;

    var connection = mysql.createConnection(mysql_option);
    connection.query("SELECT * FROM user WHERE user_id = " + user.user_id, function(err, rows) {
        if(err) throw err;
        if(rows.length > 0) {
            var user = rows[0];
            req.session.user = rows[0];
            connection.query("SELECT * FROM article WHERE user_id = " + user.user_id, function(err, rows) {
                if(err) throw err;
                var articles = rows;
                res.json({
                    data : {
                        user     : user,
                        articles : articles
                    }
                })
                connection.end();
            });
        }
    });
});

//-------用户名更改--------
router.post('/nameEditorData', function(req, res) {
    var user = req.body.user;
    var user_now = req.session.user;

    var connection = mysql.createConnection(mysql_option);

    connection.query("UPDATE user SET name = '" + user.name + "'WHERE user_id = " + user_now.user_id, function(err, rows, fields) {
        console.log(user_now.user_id)
        res.json({
            msg : user.name
        });
    });

    connection.end();
})

module.exports = router;
