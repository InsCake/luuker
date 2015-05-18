/**
 * Created by cola on 15-5-13.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function (req, res, next) {
    var data = {
        page: 'home',
        site: 'backstage',
        header: true
    };
        console.log(req.session.user) ;

    res.render('layouts/layout_backstage', data);
});


router.get('/sign_in', function (req, res, next) {
    var data = {
        page: 'sign_in',
        site: 'backstage',
        header: false
    };
    res.render('layouts/layout_backstage', data);

});

router.post('/sign_in', function (req, res, next) {
    var user = req.body.user;
    //res.json({
    //  msg: 'success',
    //user: user
    //});

    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'luuker'
    });

    connection.query("SELECT * FROM admin WHERE name = '" + user.name + "'", function (err, rows, fields) {
        if (err) throw err;
        if (rows.length > 0) {
            if (user.name == rows[0].name && user.pwd == rows[0].password) {

                req.session.user = rows[0].name;
                res.redirect('/');
            } else {
                res.json({
                    msg: 'failed'
                });
            }
        } else {
            res.json({
                msg: 'null'
            });
        }
    });

    connection.end();
});

module.exports = router;