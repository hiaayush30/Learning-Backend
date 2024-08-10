const express=require('express');
const router=express.Router();
const {Owner}=require('../models/owners-model');

router.get('/admin',(req,res)=>{
    const success=req.flash('success');
    res.render('createproducts',{success})
});

if(process.env.NODE_ENV==="development"){
    router.post('/create',async (req,res)=>{
        let owner=await Owner.find();
        if(owner.length>0){
            return res.status(500).send("You don't have permission to create a new owner!")
        }
        let {fullname,email,password}=req.body;
        await Owner.create({
            fullname,email,password
        })
        res.status(201).send('you created a new owner!');
    })
}


module.exports=router;