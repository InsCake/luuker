var express = require('express');
var router = express.Router();

router.post('/images', function(req, res, next) {
    console.log(req.files);
    res.send(req.files.upload.path.slice(5));
});


module.exports = router;