const express = require('express');
const User = require('../models/user');
const { validateUser } = require('../middlewares/userValidation');
const router = express.Router();
const upload = require('../utils/multer');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

router.get('/create', validateUser, (req, res) => {
    if (!req.user) return res.redirect('/user/signin');
    res.render('createBlog', { user: req.user });
})

router.post('/upload', validateUser, upload.single('coverImage'), async (req, res) => {
    const { title, description } = req.body;
    if(req.file){
        const blog = await Blog.create({
            description,
            title,
            coverImage: req.file.filename,
            createdBy: req.user._id
        })
    }else{
        const blog = await Blog.create({
            description,
            title,
            createdBy: req.user._id
        })
        console.log(blog);
    }
    res.redirect('/');
})

router.get('/viewAll',validateUser, async (req, res) => {
    try {
        const allBlogs = await Blog.find({}).sort({ 'createdAt': -1 })   //sorting in descending order
        console.log('allBlogs:',allBlogs.length)
        res.render('viewBlog', { blogs: allBlogs, user: req.user}); 
    } catch (err) {
        console.log(err);
    }
})

router.get('/viewMyBlogs', validateUser, async (req, res) => {
    if (!req.user) return res.redirect('/user/signin');
    const allBlogs = await Blog.find({ createdBy: req.user._id }).sort({ 'createdAt': -1 })   //sorting in descending order
    console.log(allBlogs)
    res.render('viewBlog', { blogs: allBlogs, user: req.user });
})

router.get('/view/:id', validateUser, async (req, res) => {
    if (!req.user) return res.redirect('/user/signin');
    try {
        const id = req.params.id.trim();
        const blog = await Blog.findById(id).populate('createdBy');
        const comments=await Comment.find({blog:blog._id}).populate('createdBy');
        res.render('viewOneBlog', { blog, user: req.user,comments});
    } catch (err) {
        console.log('viewOneBlog error',err.message);
    }
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Blog.findByIdAndDelete(id);
        res.redirect('/blog/viewAll');
    } catch (err) {
        console.log(err);
        res.send(`something went wrong!`);
    }
})

router.post('/postComment/:id', validateUser, async (req, res) => {
    try {
        const { body } = req.body;
        await Comment.create({
            body,
            createdBy: req.user._id,
            blog: req.params.id
        })
        res.redirect(`/blog/view/${req.params.id}`);
    } catch (err) {
        console.log(err.message);
    }
})
module.exports = router