'use strict';

const express = require('express');
const md5 = require('md5');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/authorize',(req, res, next)=>{
	let response_type = req.query.response_type;
	let client_id = req.query.client_id;
	let state = req.query.state;
	let redirect_uri = req.query.redirect_uri;
	let code = md5(client_id);
	let error = '';
	let error_description = '';
	result = code ? '?code='+code : '?error='+code+'&error_description='+error_description;
	res.redirect(302, redirect_uri+result+(state ? '&state='+state: ''));
});

router.all('/token', (req, res, next)=>{

})

module.exports = router;