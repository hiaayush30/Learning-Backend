require("dotenv").config();
require('./config/mongoose-connection');
const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const indexRouter=require('./routes/indexRouter');
const path=require('path');
const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();

const expressSession=require('express-session');
const flash=require('connect-flash');
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',indexRouter)
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})
