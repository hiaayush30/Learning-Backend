const mongoose=require('mongoose');

const ownerSchema=new mongoose.Schema({
    fullname:{
        type:String,
        trim:true,
        minLength:3
    },
    email:String,
    password:String,
    products:[],
    gstin:String,
    picture:String
});

const Owner=mongoose.model('Owner',ownerSchema);

module.exports={Owner};