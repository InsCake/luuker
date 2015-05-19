var express = require('express');
var router = express.Router();

router.post('/images', function(req, res, next) {
    console.log(req.files);
});


module.exports = router;