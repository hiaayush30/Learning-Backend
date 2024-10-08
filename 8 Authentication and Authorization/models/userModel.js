const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_URL)

const userSchema=new mongoose.Schema({
     username:String,
     email:String,
     password:String,
     age:Number
});

const User=mongoose.model('User',userSchema);

module.exports={User};