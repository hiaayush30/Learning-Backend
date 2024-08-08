const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    originaLink:String,
    visitHistory:[{timestamp:Number}]
},{timestamps:true});

const Url=mongoose.model('Url',urlSchema);

module.exports=Url
