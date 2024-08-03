require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const { User } = require('./models/userModel');
const { Post } = require('./models/postModel');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());   // to read the cookie
app.set('view engine', 'ejs');

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'secret_key', async (err, decoded) => {
            if (err) return res.status(401).send('<h3>Invalid or expired token. Please logout and login again.</h3>');
            else {
                req.user = decoded;
                next();
            }
        })
    }
    else res.send('<h3>You need to be logged in first!</h3>');
}

app.get('/', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const existing = await User.findOne({ email });
    if (existing != null) return res.status(500).send(`<h2>Email already registered! </h2>`);
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log('error::salt not generated!');
            res.render('error');
        } else {
            bcrypt.hash(password, salt, async (err, hashed) => {
                const user = await User.create({
                    username,
                    email,
                    password: hashed
                })
                const token = jwt.sign({ email, userid: user._id }, 'secret_key');
                res.cookie('token', token, { path: '/' });
                //path:'/' means cookie accessible for all routes of the domain this is default ie no need to write
                res.redirect('/profile')
            })
        }
    })
})

app.get('/login', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'secret_key', async (err, decoded) => {
            if (err) return res.status(401).send('<h3>Invalid or expired token. Please log in again.</h3>');
            else {
                const user = await User.findOne({ _id: decoded.userid });
                res.render('accountDashboard', { user });
            }
        })
    }
    else res.render('login');
})

app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) return res.status(500).send('email or password incorrect!');
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) console.log(err);
        else if (!result) return res.status(500).send('email or password incorrect!');
        else {
            const token = jwt.sign({ email, userid: user._id }, 'secret_key');
            res.cookie('token', token, { path: '/' });
            res.redirect('/profile');
        }
    });
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login')
})

app.get('/profile', isLoggedIn, async (req, res) => {
    const _id = req.user.userid;
    const user = await User.findOne({ _id });
    await user.populate('posts'); 
    res.render('profile', { user,posts:user.posts});
})

app.post('/createPost', isLoggedIn, async (req, res) => {
    if (req.body.url.trim() == '' || req.body.content.trim() == '') {
        return res.send('<center>url or content cannot be empty!</center>')
    }
    else {
        const post = await Post.create({
            image_url: req.body.url,
            content: req.body.content,
            user: req.user.userid,
        });
        const user = await User.findOne({ _id: req.user.userid });
        user.posts.push(post._id);
        await user.save();
        res.redirect('/profile');
    }
})

app.get('/like/:postid', isLoggedIn, async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postid });
    if (post.likes.includes(req.user.userid)) {  
        //or if(post.likes.indexOf(req.user.userid)===-1) returns -1 when no match found
        return res.send('post already liked!');
    } else {
        post.likes.push(req.user.userid);
        await post.save();
        res.redirect('/profile')
    }
})

app.get('/unlike/:postid', isLoggedIn, async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postid });
    post.likes = post.likes.filter(id => {
        return id != req.user.userid
    })
    await post.save();
    res.redirect('/profile');
})

app.get('/editPost/:id',isLoggedIn,async (req,res)=>{
    const post=await Post.findOne({_id:req.params.id});
    res.render('editPost',{post});
})

app.post('/updatePost/:id',isLoggedIn,async(req,res)=>{
    await Post.findOneAndUpdate({_id:req.params.id},{
        content:req.body.content,
        image_url:req.body.imgurl
    });
    res.redirect('/profile');
})

app.get('/deletePost/:id',isLoggedIn,async(req,res)=>{
    const post=await Post.findOneAndDelete({_id:req.params.id});
    const user=await User.findOne({_id:req.user.userid});
     console.log(user.posts)
    const updatedPosts=user.posts.filter(id=>{
        return id.toString() != post._id.toString()
    });
    user.posts=updatedPosts;
    await user.save();
    res.redirect('/profile');
})

app.listen(process.env.PORT, () => {
    console.log('server running on ' + process.env.PORT);
})