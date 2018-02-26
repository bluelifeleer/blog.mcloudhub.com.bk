'use strict';

var express = require('express');
var vhost = require('vhost');
var app = express();

app.use(vhost('blog.mcloudhub.com', function (req, res, next) {
    // pass
    next();
}));

app.use(vhost('images.mcloudhub.com', function (req, res, next) {
    // pass
    next();
}));
//# sourceMappingURL=main.js.map