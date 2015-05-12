var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/write', function(req, res, next) {
    var data = {
        page   : 'article_write',
        site   : 'pc',
        header : 'common'
    };
    res.render('layouts/layout', data);
});

module.exports = router;
