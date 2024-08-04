const express=require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router=express.Router();
const {Product}=require('../models/products-model');

router.get('/',(req,res)=>{
    let error=req.flash('error');
    res.render('index',{error});
});

router.get('/shop',isLoggedIn,async (req,res)=>{
    const products=await Product.find();
    res.render('shop',{products});
})

router.get('/logout',(req,res)=>{
    res.cookie("token","");
    req.flash('error','you have been logged out!');
    res.redirect('/');
})

module.exports=router;