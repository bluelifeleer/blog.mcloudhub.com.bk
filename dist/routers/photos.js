'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('../views/photos/lists', {
        token: req.token,
        uid: req.uid,
        page_type: 'photos',
        title: '我的相册'
    });
});

module.exports = router;
//# sourceMappingURL=photos.js.map