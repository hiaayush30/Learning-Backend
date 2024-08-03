const mongoose=require('mongoose');
mongoose.connect();
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    imageurl:String
 });
 
 const User=mongoose.model('User',userSchema);
 
 module.exports={User};