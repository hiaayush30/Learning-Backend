const express=require('express');
const app=express();
const logRequest=require('./middlewares/logRequest');
const dbConnection=require('./config/dbConnection');
const urlRouter=require('./routes/url');
const homeRouter=require('./routes/home');
const path = require('path');

dbConnection('mongodb://localhost:27017/urlShortener');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(logRequest);
app.set('view engine','ejs');
app.set('views',path.resolve('views'))

app.use('/',homeRouter);
app.use('/url',urlRouter);

app.listen(3000,()=>{
    console.log('server running on port '+3000);
})