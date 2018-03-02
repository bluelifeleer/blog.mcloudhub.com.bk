const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('../views/index',{
        token:req.token,
        uid:req.uid,
        page_type: 'index',
        title:'博客'
    });
});

router.get('/editor',(req,res,next)=>{
    if(req.token && req.uid){
        res.render('../views/article_editor',{
            token:req.token,
            uid:req.uid,
            page_type: 'editor',
        });
    }else{
        res.redirect(302,'/login');
    }

});

router.get('/upfile',(req,res,next)=>{
    if(req.token && req.uid){
        res.render('../views/upfile',{
            token:req.token,
            uid:req.uid,
            page_type: 'upfile',
        });
    }else{
        res.redirect(302,'/login');
    }
})

router.get('/account',(req,res,next)=>{
    if(req.query.uid){
        res.render('../views/account/account',{
            token:req.token,
            uid:req.uid ? req.uid:req.query.uid,
            page_type: 'account',
            title:'我的主页'
        });
    }else{
        if(req.token && req.uid){
            res.render('../views/account/account',{
                token:req.token,
                uid:req.uid,
                page_type: 'account',
                title:'我的主页'
            });
        }else{
            res.redirect(302,'/login');
        }
    }
})

router.get('/account/collections/lists',(req,res,next)=>{
    res.render('../views/account/collections/lists',{
        token:req.token,
        page_type: 'collections_list',
        uid:req.uid,
        title:'专题列表'
    });
});

router.get('/account/collections/new',(req,res,next)=>{
    if(req.token && req.uid){
        res.render('../views/account/collections/new',{
            token:req.token,
            page_type: 'collections_new',
            uid:req.uid,
            title:'专题列表'
        });
    }else{
        res.redirect(302,'/login');
    }
})

router.get('/account/collections/detailes',(req,res,next)=>{
    res.render('../views/account/collections/detailes',{
        token:req.token,
        page_type: 'collections_detailes',
        uid:req.uid,
        coll_id:req.query.id,
        title:'专题详情'
    });
});

router.get('/account/dcs',(req,res,next)=>{
    res.render('../views/account/document/detailes',{
        token:req.token,
        page_type: 'document_detailes',
        uid:req.uid,
        coll_id:req.query.id,
        title:'文集详情'
    });
});

router.get('/register',(req,res,next)=>{
    res.render('../views/register');
});

router.get('/login', (req, res, next) => {
    res.render('../views/login');
});

module.exports = router;