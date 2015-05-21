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


//router.post('/changeUserName', function (req, res, next) {
//    var url = req.body.url
//
//    var connection = mysql.createConnection({
//        host: 'localhost',
//        port: '3306',
//        user: 'root',
//        password: 'root',
//        database: 'luuker'
//    });
//
//    connection.query("UPDATE headimg SET url = '" + url.new_img_url + "'", function (err, rows, fields) {
//        res.json({msg: 'success'});
//    });
//
//    connection.end();
//});


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

        console.log(user);
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
        console.log(result);
        res.json({
            msg      : 'success',
            new_user : new_user
        })
    });

    connection.end();
});

module.exports = router;
