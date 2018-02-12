'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();

router.get('/lists', function (req, res, nex) {
    res.render('../views/articles/lists', {
        token: req.token,
        uid: req.uid
    });
});

router.get('/details', function (req, res, nex) {
    res.render('../views/articles/details', {
        token: req.token,
        uid: req.uid
    });
});

module.exports = router;
//# sourceMappingURL=article.js.map