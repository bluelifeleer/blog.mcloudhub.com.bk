'use strict';

var express = require('express');
var md5 = require('md5');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();

router.get('/authorize', function (req, res, next) {
	var response_type = req.query.response_type;
	var client_id = req.query.client_id;
	var state = req.query.state;
	var redirect_uri = req.query.redirect_uri;
	var code = md5(client_id);
	var error = '';
	var error_description = '';
	result = code ? '?code=' + code : '?error=' + code + '&error_description=' + error_description;
	res.redirect(302, redirect_uri + result + (state ? '&state=' + state : ''));
});

router.all('/token', function (req, res, next) {});

module.exports = router;
//# sourceMappingURL=oauth.js.map