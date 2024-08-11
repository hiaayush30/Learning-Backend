const { name } = require('ejs');
const jwt = require('jsonwebtoken');

const createTokenForUser = function (user) {
    const payload={
        name:user.name, 
        email: user.email,
         _id: user._id,
         profileImageUrl:user.profileImageUrl,
         role:user.role 
        }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return token;
}

const verifyTokenOfUser = function (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return decoded;
    } catch (err) {
        console.log(err);
    }
}

module.exports={createTokenForUser,verifyTokenOfUser};