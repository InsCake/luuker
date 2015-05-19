var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {
      page   : 'home',
      site   : 'pc',
      header : true,
      footer : true
    };
  res.render('layouts/layout', data);
});

module.exports = router;
