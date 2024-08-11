const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        default:"../images/defaultProfile.jpeg"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Blog=mongoose.model('Blog',blogSchema);

module.exports=Blog;