/**
 * Created by cola on 15-5-23.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql_option = require('../config/database.js');

router.get('/', function(req, res) {
    var data = {
        page         : 'destination',
        site         : 'pc',
        header       : true,
        footer       : true,
        request_urls : false,
        user         : req.session.user ? req.session.user : false
    };
    res.render('layouts/layout', data);
});

router.all('/getDesData', function(req, res){

    var connection = mysql.createConnection(mysql_option);
    connection.query("SELECT * FROM city WHERE id = '1'", function(err, rows){
        if(err) throw err;
        if(rows.length > 0) {
            var des = rows[0];

            //------------得到游记数据--------------
            connection.query("SELECT * FROM article WHERE status = '1' && city = '日本'", function(err, rows){
                if(err) throw err;
                if (rows.length >= 0) {
                    var city_articles = rows;
                    res.json({
                        msg: 'success',
                        data: {
                            city_articles: city_articles,
                            des     : des
                        }
                    });
                    connection.end();
                }
            });
        }
    });
});


module.exports = router;
