require('dotenv').config();
const bcrypt=require('bcrypt');
const path=require('node:path');
const cookieParser=require('cookie-parser');
const express=require('express');
const { User } = require('./Models/userModel');
const { Post } = require('./Models/postModel');
const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');  
});

app.get('/create',async(req,res)=>{
       const user=await User.create({
        name:'Aayush',
        age:21,
        email:'aayush@gmail.com'
       });
       res.send(user);
})

app.get('/post/create',async(req,res)=>{
    const post=await Post.create({
        data:'hello kaise ho!',
        user: "66993849d6aaf38b7f4dfda8",
    });

    let user=await User.findOne({_id:"66993849d6aaf38b7f4dfda8"});
    // await User.findOneAndUpdate({_id:user.id},{posts:[...user.posts,post._id]}); 
    //or
    user.posts.push(post._id);
    user.save();
    res.json({
        post:post,
        user:user
    })
})


app.listen(process.env.PORT,()=>{
   console.log('server running on port '+process.env.PORT);
})