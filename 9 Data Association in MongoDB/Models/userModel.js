const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_URL);

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

const User=mongoose.model('user',userSchema);

module.exports={User};