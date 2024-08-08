const express=require('express');
const Url = require('../models/urlModel');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/:id',async (req,res)=>{
    const link=req.params.id;
    console.log(link);
    const entry=await Url.findOneAndUpdate({shortId:link},{
        $push:{visitHistory:{timestamp:Date.now()}}
    });
    res.redirect(entry.originaLink);
})

module.exports=router;