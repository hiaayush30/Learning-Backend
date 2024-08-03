const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    data:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Post=mongoose.model('post',postSchema); 

module.exports={Post};