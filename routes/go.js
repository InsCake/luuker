/**
 * Created by cola on 15-5-23.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql_option = require('../config/database.js');


router.get('/searchDes', function(req, res) {
    var city_name = req.query.city_name;
    console.log(city_name);

    var connection = mysql.createConnection(mysql_option);
    connection.query("SELECT * FROM city WHERE chname = '" + city_name + "'", function(err, rows) {
       res.json({
           city : rows[0]
       });
    });
});

router.get('/:city_id', function(req, res) {
    var city_id = req.params.city_id;
    var data = {
        page         : 'destination',
        site         : 'pc',
        header       : true,
        footer       : true,
        request_urls : {
            getDesData : '/go/getDesData/' + city_id
        },
        user         : req.session.user ? req.session.user : false
    };
    res.render('layouts/layout', data);
});

router.all('/getDesData/:city_id', function(req, res) {
    var city_id = req.params.city_id;

    var connection = mysql.createConnection(mysql_option);
    connection.query("SELECT * FROM city WHERE city_id = " + city_id, function(err, rows) {
        if(err) throw err;
        if(rows.length > 0) {
            var des = rows[0];
            console.log(des);

            //------------得到游记数据--------------
            connection.query("SELECT * FROM article WHERE status = '1' && city_id = " + city_id +
                             " LIMIT 0, 6", function(err, rows) {
                if(err) throw err;
                if(rows.length >= 0) {
                    var city_articles = rows;

                    //----------得到美食数据------------
                    connection.query("SELECT * FROM city_item WHERE city_id = " + city_id +
                                     " && type = '美食'", function(err, rows) {
                        if(err) throw err;
                        if(rows.length >= 0) {
                            var city_food = rows;

                            //----------得到风景数据------------
                            connection.query("SELECT * FROM city_item WHERE city_id = " + city_id +
                                             " && type = '风景'", function(err, rows) {
                                if(err) throw err;
                                if(rows.length >= 0) {
                                    var city_sight = rows;

                                    //----------得到文化数据------------
                                    connection.query("SELECT * FROM city_item WHERE city_id = " + city_id +
                                                     " && type = '文化'", function(err, rows) {
                                        if(err) throw err;
                                        if(rows.length >= 0) {
                                            var city_culture = rows;

                                            //----------得到校园数据------------
                                            connection.query("SELECT * FROM city_item WHERE city_id = " + city_id +
                                                             " && type = '名校'", function(err, rows) {
                                                if(err) throw err;
                                                if(rows.length >= 0) {
                                                    var city_school = rows;

                                                    res.json({
                                                        msg  : 'success',
                                                        data : {
                                                            city_articles : city_articles,
                                                            des           : des,
                                                            city_food     : city_food,
                                                            city_sight    : city_sight,
                                                            city_culture  : city_culture, city_food : city_food,
                                                            city_school   : city_school
                                                        }
                                                    });
                                                    connection.end();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});


module.exports = router;
