require('dotenv').config();
const path = require('node:path');
const express = require('express');
const dbConnection = require('./utils/dbConnection');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const { validateUser } = require('./middlewares/userValidation');
const blogRouter = require('./routes/blog');
const app = express();

dbConnection();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', validateUser, (req, res) => {
    // if(!req.user)return res.redirect('/user/signin'); //we want to show the site to unregisted users
    res.render('index', { user: req.user });
}) 

app.use('/blog',blogRouter);

app.use('/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log('server running on ' + process.env.PORT);
})