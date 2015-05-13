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


// module.exports = app;

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(session({
    secret            : 'keyboard cat',
    resave            : false,
    saveUninitialized : true
}));


var user = require('./routes/user');
var article = require('./routes/article');
var backstage = require('./routes/backstage');

app.get('/', function(req, res) {
    var data = {
        page   : 'home',
        site   : 'pc',
        header : false
    };
    res.render('layouts/layout', data);
});
app.get('/go', function(req, res) {
    var data = {
        page   : 'destination',
        site   : 'pc',
        header : false
    };
    res.render('layouts/layout', data);
});

app.use('/user', user);
app.use('/article', article);
app.use('/backstage',backstage);


var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
