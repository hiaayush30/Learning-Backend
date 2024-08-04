const { User } = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const cookieParser = require('cookie-parser');

registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        const foundUser = await User.findOne({ email });
        if (foundUser) return res.status(401).json({ msg: 'user already exists!' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email,
            password: hashedPassword,
            fullname
        });
        // Generate JWT token
        const token = generateToken(user);
        res.cookie("token", token);
        res.status(201).json({ user });
    } catch (e) {
        console.error(e.message);
        res.status(500).send(e.message);
    }
}
const loginUser =async (req, res) => {
    try {
        let {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            req.flash('error','email or password incorrect!');
            return res.redirect('/');
        }
        
        const validUser=await bcrypt.compare(password,user.password);
        if(!validUser) return res.send('password is incorrect!');
        
        const token=generateToken(user);
        res.cookie('token',token);
        res.redirect('/shop');
    } catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports = { registerUser, loginUser };