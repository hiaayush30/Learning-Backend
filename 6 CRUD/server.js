//mongoose(ODM) help the node server to communicate with the mongoDB server
//ODM - Object Document Mapping 
//ORM - Object Relational Mapping
const path=require('path');
const express = require('express');
const { User } = require('./userModel');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
})

app.post('/register',async (req,res)=>{
    console.log(req.body)
    await User.create({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email
    });
    res.json({
        msg:'Registeration successfull!'
    })
});

app.get('/update',async (req,res)=>{
    const updatedUser=await User.findOneAndUpdate({username:'hiaayush'},{username: 'batman'},{new:true});
    //{new:true} returns the updated user
    res.send(updatedUser);
})

app.get('/read',async (req,res)=>{
    let users=await User.find()
    //.find() will return an empty array if no docs found but .findOne() will return null or the 
    //first entry which matches the condition
    res.send(users);
})

app.get('/delete',async(req,res)=>{
    let deletedUser=await User.findOneAndDelete({username:"aayush"});
    //returns the deleted user
    deletedUser? res.send(`user:${deletedUser.name} deleted successfully!`):res.send(`no such user found!`);
})
app.listen(3000,()=>{
    console.log('server running on port 3000');
})