var express = require('express');
var router = express.Router();

/* GET /user/ */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET /user/login */
router.post('/login', function(req, res, next) {
    var user = req.body.user;
    console.log(user);
    res.json({
        'user' : user
    });
});

module.exports = router;
