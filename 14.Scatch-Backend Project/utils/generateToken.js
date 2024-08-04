const jwt=require('jsonwebtoken');

const generateToken =function(user){
    return jwt.sign({email:user.email,id:user._id}, process.env.SECRET_KEY,{expiresIn:'1h'});
} 

module.exports=generateToken;
