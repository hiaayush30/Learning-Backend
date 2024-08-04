const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        trim:true,
        minLength:3
    },
    email:String,
    password:String,
    cart:[],
    orders:[],
    contact:Number,
    picture:String
});

const User=mongoose.model('User',userSchema);

module.exports={User};