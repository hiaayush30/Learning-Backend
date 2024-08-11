const express = require('express');
const User = require('../models/user');
const { createTokenForUser, verifyTokenOfUser } = require('../utils/authentication');
const { validateUser } = require('../middlewares/userValidation');
const router = express.Router();

router.get('/signin',validateUser, (req, res) => {
    if(req.user) return res.redirect('/')
    res.render('signin')
})

router.get('/signup',validateUser, (req, res) => {
    if(req.user) return res.redirect('/');
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user=await User.create({ name, email, password });
        const token = createTokenForUser(user);
        res.cookie('token', token);
        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }
})

router.post('/signin', async (req, res) => {
    try {
        console.log('hey')
        const { email, password } = req.body;
        const user = await User.matchPassword(email, password)
        const token = createTokenForUser(user);
        res.cookie('token', token).redirect('/');
    } catch (err) {
        res.render('signin', { error: "Incorrect username or password!" })
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router