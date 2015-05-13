/**
 * Created by cola on 15-5-13.
 */
var express = require('express');
var router = express.Router();
//var mysql = require('mysql');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/sign_in', function(req, res, next) {
    var data = {
        page   : 'sign_in',
        site   : 'backstage',
        header : false
    };
    res.render('layouts/backstage_layout', data);
});

module.exports = router;