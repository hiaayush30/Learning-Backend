const mongoose=require('mongoose');

mongoose.connect()

const userSchema=mongoose.Schema({
    name:String,
    username:String,
    email:String
});

const User=mongoose.model("User",userSchema);

module.exports={User};
