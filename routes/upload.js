var express = require('express');
var router = express.Router();

router.post('/images', function(req, res, next) {
    res.json({
        msg       : 'success',
        image_url : req.files.path
    })
});


module.exports = router;