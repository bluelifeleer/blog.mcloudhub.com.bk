const express = require('express');
const vhost = require('vhost');
const app = express();

app.use(vhost('blog.mcloudhub.com',(req,res,next)=>{
    // pass
    next();
}));

app.use(vhost('images.mcloudhub.com',(req,res,next)=>{
    // pass
    next();
}));