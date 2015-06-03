// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// editor.exports = app;

var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var multer = require('multer');
var mysql = require('mysql');
var mysql_option = require('./config/database.js');


var app = express();
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(session({
    keys : ['key1', 'key2']
}))
app.use(multer({ dest : './views/images/uploads' }));

var user = require('./routes/user');
var article = require('./routes/article');
var backstage = require('./routes/backstage');
var upload = require('./routes/upload');
var go = require('./routes/go');

app.get('/', function(req, res) {
    var data = {
        page         : 'home',
        site         : 'pc',
        header       : false,
        footer       : true,
        request_urls : false,
        user         : req.session.user ? req.session.user : false
    };
    res.render('layouts/layout', data);
});
app.get('/homeEditorData', function(req, res) {
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

                    //获取热门地点数据
                    connection.query("SELECT city_id, city.img, COUNT(*) FROM city JOIN article ON city.chname = article.city_id GROUP BY city_id ORDER BY COUNT(*) DESC", function(err, rows){
                        if (err) throw err;
                        if (rows.length > 0){
                            var hot_city = rows;
                            res.json({
                                msg: 'success',
                                data: {
                                    rec_articles: rec_articles,
                                    head_img    : head_img,
                                    hot_city    : hot_city
                                }

                            });
                            connection.end();
                        }
                    });

                }
            })
        } else {
            res.json({msg: 'null'});
        }
    });
    //var query = "SELECT city_id, COUNT(*) FROM city JOIN article ON city.city_id = article.city_id GROUP BY city_id ORDER BY COUNT(*) DESC";
});

app.use('/user', user);
app.use('/article', article);
app.use('/backstage', backstage);
app.use('/upload', upload);
app.use('/go', go);


var server = app.listen(3005, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
