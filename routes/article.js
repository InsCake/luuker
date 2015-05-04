var express = require('express');
var router = express.Router();

/* GET /article/ */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET /user/write */
router.post('/write', function(req, res, next) {
    var user = req.body.user;

    console.log(user);
    res.json({
        'user' : user
    });
});

module.exports = router;
