const express = require('express');
const User = require('../models/user');
const { validateUser } = require('../middlewares/userValidation');
const router = express.Router();
const upload = require('../utils/multer');
const Blog = require('../models/blog');

router.get('/create', validateUser, (req, res) => {
    if (!req.user) return res.redirect('/user/signin');
    res.render('createBlog', { user: req.user });
})

router.post('/upload', validateUser, upload.single('coverImage'), async (req, res) => {
    const { title, description } = req.body;
    console.log(req.file.filename.toString());
    const blog = await Blog.create({
        description,
        title,
        coverImage: req.file.filename,
        createdBy: req.user._id
    })
    console.log('blog', blog);
    res.redirect('/');
})

router.get('/view', validateUser, async (req, res) => {
    // if(!req.user) return res.redirect('/user/signin');
    const allBlogs = await Blog.find({}).sort({ 'createdAt': -1 })   //sorting in descending order
    console.log(allBlogs)
    res.render('viewBlog', { blogs: allBlogs, user: req.user });
})

router.get('/view/:id', validateUser, async (req, res) => {
    if (!req.user) return res.redirect('/user/signin');
    try {
        const id = req.params.id.trim();
        const blog = await Blog.findById(id)
        res.render('viewOneBlog', { blog, user: req.user });
    } catch (err) {
        console.log(err.message);
    }
})

router.get('/delete/:id',async (req,res)=>{
   const id=req.params.id;
   try{
    await Blog.findByIdAndDelete(id);
    res.redirect('/blog/view');
   }catch(err){
    console.log(err);
    res.send(`something went wrong!`);
   }
})
module.exports = router