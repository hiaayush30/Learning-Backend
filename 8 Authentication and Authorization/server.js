require('dotenv').config()
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express=require('express');
const path=require('node:path');
const { User } = require('./models/userModel');
const app=express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render('index')
});

app.post('/create',async(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const age=req.body.age;
    const password=req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            await User.create({
                username,
                email,
                password:hash,
                age
            });   
        })
    })
    let token=jwt.sign({email},'my_Secret_key');
    res.cookie('token',token,{path:'/'});
    res.render('login')
})

app.get('/logout',(req,res)=>{
   res.cookie('token','');
   res.render('login')
})

app.get('/login',(req,res)=>{
   res.render('login')
})

app.post('/login',async (req,res)=>{
   const user=await User.findOne({email:req.body.email});
   if(!user) return res.send('email or password is incorrect!');
   bcrypt.compare(req.body.password,user.password,(err,result)=>{
    if(result==false)return res.send('email or password is incorrect!');
    let token=jwt.sign({email:user.email},'my_Secret_key');
    res.cookie('token',token,{path:'/'});
    res.send('yes you can login!');
   })
})

app.listen(process.env.PORT,()=>{
    console.log('server running on port '+process.env.PORT);
})