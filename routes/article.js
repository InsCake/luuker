var express = require('express');
var mysql = require('mysql');
var mysql_option = require('../config/database.js');
var router = express.Router();

router.get('/write', function(req, res) {
    if(!req.session.user) {
        res.redirect('../');
    } else {
        var data = {
            page         : 'article_write',
            site         : 'pc',
            header       : true,
            footer       : true,
            request_urls : false,
            user         : req.session.user ? req.session.user : false
        };
        res.render('layouts/layout', data);
    }
});

router.post('/write', function(req, res) {
    var article = req.body.article;
    var article_id;
    var user_id = req.session.user.user_id;

    var connection = mysql.createConnection(mysql_option);

    connection.query("INSERT INTO article (name, img, user_id, type) VALUES ('" + article.name
                     + "', '" + article + "', '" + user_id + "', 'travel_notes')", function(err, result) {
        if(err) throw err;
        article_id = result.insertId;

        for(var i = 0; i < article.units.length; i++) {
            connection.query("INSERT INTO article_unit (type, value, display_order, article_id) VALUES ('"
                             + article.units[i].type + "', '"
                             + article.units[i].value + "', "
                             + i + ", "
                             + article_id + ")", function(err, result) {
                if(err) throw err;
                console.log(result.insertId);
            });
            if(i + 1 >= article.units.length) {
                connection.end();
            }
        }
    });


    res.json({
        msg : 'success'
    })
});

router.get('/articleData/:article_id', function(req, res) {
    var article_id = req.params.article_id;

    var connection = mysql.createConnection(mysql_option);
    connection.query("SELECT * FROM article WHERE article_id = " + article_id, function(err, rows) {
        if(err) throw err;
        if(rows.length > 0) {
            var article = rows[0];
            connection.query("SELECT * FROM article_unit WHERE article_id = " + article_id, function(err, rows) {
                if(err) throw err;
                if(rows.length > 0) {
                    var article_units = rows;
                    connection.query("SELECT * FROM comment LEFT JOIN user on user.user_id = comment.user_id WHERE article_id = " +
                                     article_id, function(err, rows) {
                        if(err) throw err;
                        var comments = rows;
                        console.log(article);
                        res.json({
                            data : {
                                article       : article,
                                article_units : article_units,
                                comments      : comments
                            }
                        });
                        connection.end();
                    });
                }
            });
        }
    });
});

router.post('/addComment', function(req, res) {
    var comment = req.body.comment;
    var article_id = req.body.article_id;
    var user_id = req.session.user.user_id;

    var connection = mysql.createConnection(mysql_option);
    connection.query("INSERT INTO comment (content, article_id, user_id) VALUES ('" + comment + "', " + article_id +
                     ", " + user_id + ")", function(err, result) {
        if(err) throw err;
        res.json({
            msg : 'success'
        });
    });
});

router.get('/:article_id', function(req, res) {
    var article_id = req.params.article_id;
    res.render('layouts/layout', {
        page         : 'article',
        site         : 'pc',
        header       : 'common',
        footer       : true,
        request_urls : {
            getArticleData : '/article/articleData/' + article_id
        },
        user         : req.session.user ? req.session.user : false

    });
});

module.exports = router;
