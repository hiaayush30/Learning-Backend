const mongoose=require("mongoose");

mongoose.connect(process.env.CONNECTION_URL);

const userSchema=new mongoose.Schema({
   username:String,
   email:String,
   password:String,
   posts:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
   }]
});

const User=mongoose.model('User',userSchema);

module.exports={User};