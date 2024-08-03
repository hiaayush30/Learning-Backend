require("dotenv").config();
require('./config/mongoose-connection');
const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const path=require('path');
const cookieParser = require('cookie-parser');
const express=require('express');
const app=express()
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})
