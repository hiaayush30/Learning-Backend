const express = require('express');
const router = express.Router();
const { User } = require('../models/user-model');
const {registerUser,loginUser}=require('../controllers/authController');
const isLoggedIn=require('../middlewares/isLoggedIn');



router.get('/',(req, res) => {
    res.send("welcome to the users's route!");
});

router.post('/register',registerUser)
router.post('/login',loginUser);

module.exports = router;