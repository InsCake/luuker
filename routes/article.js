var express = require('express');
var mysql = require('mysql');
var mysql_option = require('../config/database.js');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/write', function(req, res) {
    var data = {
        page   : 'article_write',
        site   : 'pc',
        header : 'common',
        footer : true
    };

    var connection = mysql.createConnection(mysql_option);

    connection.query("SELECT * FROM article_unit", function(err, rows, fields) {
        if(err) throw err;
        console.log(rows);
    });

    connection.end();

    res.render('layouts/layout', data);
});

module.exports = router;
