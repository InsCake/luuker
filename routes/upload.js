var express = require('express');
var router = express.Router();

router.post('/images', function(req, res, next) {
    console.log(req.body)
    console.log(req.files)

    //var form = new formidable.IncomingForm(),
    //    fields = [],
    //    files = [];
    //form.encoding = 'utf-8';
    //
    //form
    //    .on('error', function(err) {
    //        res.writeHead(200, { 'content-type' : 'text/plain' });
    //        res.end('error:\n\n' + util.inspect(err));
    //    })
    //    .on('file', function(field, file) {
    //        file.path = appDir + '/upload/images';
    //        console.log(file.path);
    //        files.push([field, file]);
    //    })
    //    .on('end', function() {
    //        console.log('-> post done');
    //        res.writeHead(200, { 'content-type' : 'text/plain' });
    //        res.end('received fields:\n\n ' + util.inspect(files));
    //    });
    //form.parse(req);
});


module.exports = router;