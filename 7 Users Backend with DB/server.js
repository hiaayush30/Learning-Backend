const express=require('express');
const app=express();
const path=require('path');
const { User } = require('./models/userModel');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render(`index`);
})
app.get('/read',async(req,res)=>{
    const users=await User.find();
    res.render(`read`,{users:users});
})
app.post('/create',async(req,res)=>{
   await User.create({
     name:req.body.name,
     email:req.body.email,
     imageurl:req.body.imageurl
   })
   res.redirect('/read');
})

app.get('/delete/:id',async(req,res)=>{
   await User.findOneAndDelete({_id:req.params.id});
   res.redirect('/read');
})
app.get('/edit/:id',async (req,res)=>{
    const user=await User.findOne({_id:req.params.id});
    res.render('edit',{user:user});
})
app.post('/update/:id',async(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const email=req.body.email;
    const imageurl=req.body.imageurl;
    await User.findOneAndUpdate({_id:id},{name,email,imageurl});
    res.redirect('/read');
})
app.listen(3000,()=>{
    console.log(`server running on port 3000`);
})