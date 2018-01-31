const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('../views/admin/index');
});

router.get('/login', (req, res, next) => {
    res.render('../views/admin/login');
});

router.post('/sigup', (req, res, next) => {
    res.render('../views/admin/regin');
});

module.exports = router;