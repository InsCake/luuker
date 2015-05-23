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
            res.json({
                data : {
                    des     : des
                }
            });
            connection.end();
        }
    });

})

module.exports = router;
