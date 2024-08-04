const jwt = require('jsonwebtoken');
const { User } = require('../models/user-model');
const isLoggedIn = async (req, res, next) => {
    try {
        if(!req.cookies.token){ 
            req.flash('error','you need to login first!')
            //the above flash message can be accessed on our redirected route
            return res.redirect('/'); 
        }
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);  
        if (!decoded) return res.json({ msg: "invalid token!" });
        const user=User
        .findOne({email:jwt.decode.email})
        .select('-password');
        //will return the data of the user except the password field
        req.user=user;
        next();
    } catch (e) {
        req.flash('error',e.message);
        console.log(e);  
    }
};

module.exports = isLoggedIn;