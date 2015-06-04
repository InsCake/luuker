/**
 * Created by cola on 15-5-13.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql_option = require('../config/database.js');


//------后台主页页面渲染-------
router.get('/', function (req, res, next) {
    if (req.session.admin == null) {
        res.redirect('/backstage/sign_in');
    } else {
        var data = {
            page: 'home',
            site: 'backstage',
            header: true,
            footer: true,
            user: req.session.admin
        };
    }
    res.render('layouts/layout_backstage', data);
});

//------登陆页面渲染----------
router.get('/sign_in', function (req, res, next) {
    var data = {
        page: 'sign_in',
        site: 'backstage',
        header: false,
        footer: false
    };
    res.render('layouts/layout_backstage', data);
});

//------首页管理页面渲染------
router.get('/editor', function (req, res, next) {
    if (req.session.admin == null) {
        res.redirect('/backstage/sign_in');
    } else {
        var data = {
            page: 'editor',
            site: 'backstage',
            header: true,
            footer: true,
            user: req.session.admin
        };
        res.render('layouts/layout_backstage', data);
    }
});

//------目的地管理页面渲染--------------------
router.get('/editor_city', function (req, res, next) {

    if (req.session.admin == null) {
        res.redirect('/backstage/sign_in');
    } else {
        var data = {
            page: 'editor_city',
            site: 'backstage',
            header: true,
            footer: true,
            user: req.session.admin
        };

        res.render('layouts/layout_backstage', data);
    }


});
//------游记管理页面渲染-----------------------
router.get('/article_go', function (req, res, next) {

    if (req.session.admin == null) {
        res.redirect('/backstage/sign_in');
    } else {
        var data = {
            page: 'article_go',
            site: 'backstage',
            header: true,
            footer: true,
            user: req.session.admin
        };

        res.render('layouts/layout_backstage', data);
    }


});

//------游记审核动作--------------------------
router.get('/getArticleData', function (req, res, next) {

    var connection = mysql.createConnection(mysql_option);
    connection.query("SELECT * FROM article WHERE status = '0'", function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            var articles = rows;
            res.json({
                data: {
                    articles: articles
                }
            });
            connection.end();
        }
    });
});

router.post('/passArticleData', function (req, res, next) {
    var article_id = req.body.article_id;
    var article_city = req.body.article_city;
    var connection = mysql.createConnection(mysql_option);
    connection.query("UPDATE article SET status = '1' , city_id = '" + article_city + "'WHERE article_id = " + article_id, function (err, rows) {
        if (err) throw err;
        if (rows.affectedRows > 0) {
            res.json({msg: 'success'});
        }
    });
});

router.post('/unpassArticleData', function (req, res, next) {
    var article_id = req.body.article_id;
    var connection = mysql.createConnection(mysql_option);
    connection.query("UPDATE article SET status = '2' WHERE article_id = " + article_id, function (err, rows) {
        if (err) throw err;
        if (rows.affectedRows > 0) {
            res.json({msg: 'success'});
        }
    });
});

//------目的地管理输入数据------
router.post('/intoCityData', function (req, res, next) {
    var city = req.body.city;
    var connection = mysql.createConnection(mysql_option);

    connection.query("INSERT INTO city (chname, egname, img, intro, book) VALUES ('" + city.chname + "','" + city.egname +
    "','" + city.img + "','" + city.intro + "','" + city.book + "')", function (err, result) {
        if (err) throw err;
        res.json({
            msg: 'success'
        })
    });

});

router.post('/intoCityItem', function (req, res, next){
    var city_item = req.body.city_item;

    var connection = mysql.createConnection(mysql_option);
    connection.query("INSERT INTO city_item (city_id, title, txt, img, type) VALUES ('" + city_item.id +"','" + city_item.title +
    "','" + city_item.txt + "','" + city_item.img + "','" + city_item.type + "')",function (err, result){
        if (err) throw err;
        res.json({
            msg: 'success'
        })
    })
});

router.post('/uploadItemImage', function(req, res) {
    var image = req.files;
    console.log(image);
    res.send(image.upload.path.slice(5));

});

//------网站运营（头图，推荐游记）更改动作------
router.get('/homeEditorData', function (req, res, next) {
    var connection = mysql.createConnection(mysql_option);

    connection.query("SELECT * FROM headimg WHERE id = '1'", function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            var head_img = rows[0];

            // 获取推荐游记表数据
            connection.query("SELECT * FROM recommend LEFT JOIN article on recommend.article_id = article.article_id", function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    var rec_articles = rows;
                    res.json({
                        msg: 'success',
                        data: {
                            rec_articles: rec_articles,
                            head_img    : head_img
                        }

                    });
                    connection.end();
                }
            })
        } else {
            res.json({msg: 'null'});
        }
    });
});

router.post('/changeHomeBanner', function (req, res, next) {
    var url = req.body.url;

    var connection = mysql.createConnection(mysql_option);

    connection.query("UPDATE headimg SET url = '" + url.new_img_url + "'", function (err, rows, fields) {
        res.json({msg: 'success'});
    });

    connection.end();
});

router.post('/changeHomeTxt', function (req, res, next) {
    var txt = req.body.txt;

    var connection = mysql.createConnection(mysql_option);

    connection.query("UPDATE headimg SET txt = '" + txt.new_txt +"'" , function (err, rows, fields) {
        if (err) throw err;
        if (rows.affectedRows > 0){
            res.json({
                msg: 'success'
            });
            console.log(txt.new_txt)

        }
    });

    connection.end();
});

router.post('/changeRecArticle', function (req, res, next) {
    var rec_id = req.body.rec_id;
    var new_id = req.body.new_id;

    var connection = mysql.createConnection(mysql_option);
    connection.query("UPDATE recommend SET article_id = '" + new_id + "' WHERE rec_id = " + rec_id, function(err, rows){
        if (err) throw err;
        if (rows.affectedRows > 0){
            res.json({
                msg: 'success'
            });
        }
    });

});

//------登陆动作-------------
router.post('/sign_in', function (req, res, next) {
    var user = req.body.user;

    var connection = mysql.createConnection(mysql_option);

    connection.query("SELECT * FROM admin WHERE name = '" + user.name + "'", function (err, rows, fields) {
        if (err) throw err;
        if (rows.length > 0) {
            if (user.name == rows[0].name && user.pwd == rows[0].password) {
                req.session.admin = rows[0];
                res.json({msg: 'success'});
            } else {
                res.json({msg: 'failed'});
            }
        } else {
            res.json({msg: 'null'});
        }
    });

    connection.end();
});

//------登出动作-------------
router.get('/sign_out', function (req, res, next) {
    req.session.admin = null;
    res.redirect('/backstage/sign_in');
});

//------修改密码动作---------
router.post('/change_pwd', function (req, res, next) {
    var pwd = req.body.user;
    var user = req.session.admin;

    var connection = mysql.createConnection(mysql_option);

    connection.query("SELECT * FROM admin WHERE admin_id = " + user.admin_id, function (err, rows, fields) {
        if (err) throw err;
        if (pwd.pwd_old != rows[0].password) {
            res.json({msg: 'wrong'});
        } else {
            connection.query("UPDATE admin SET password = '" + pwd.pwd_new_1 + "'", function (err, rows, fields) {
                res.json({msg: 'success'});
                connection.end();
            });
        }
    });
});

router.get('/add_guide', function(req, res, next) {
    if (req.session.admin == null) {
        res.redirect('/backstage/sign_in');
    } else {
        var data = {
            page: 'add_guide',
            site: 'backstage',
            header: true,
            footer: false,
            user: req.session.admin
        };
        res.render('layouts/layout_backstage', data);
    }
});

router.post('/add_guide', function(req, res) {
    var article = req.body.article;
    var article_id;

    var connection = mysql.createConnection(mysql_option);

    connection.query("INSERT INTO article (name, img, type) VALUES ('" + article.name
                     + "', '" + article.banner + "', 'official_notes')", function(err, result) {
        if(err) throw err;
        article_id = result.insertId;

        for(var i = 0; i < article.units.length; i++) {
            connection.query("INSERT INTO article_unit (type, value, display_order, article_id) VALUES ('"
                             + article.units[i].type + "', '"
                             + article.units[i].value + "', "
                             + i + ", "
                             + article_id + ")", function(err, result) {
                if(err) throw err;
                //console.log(result.insertId);
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

module.exports = router;