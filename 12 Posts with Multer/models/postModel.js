const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_URL);

const postSchema = new mongoose.Schema({
    image_url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content:String,
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
},{timestamps:true});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };