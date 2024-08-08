//using Multer with error handling
const path = require('path');
const userRouter=require('./routes/userRoute');
const express = require('express');
const app = express();

//connecting to db
const {connectDb}=require('./connection'); 
connectDb('mongodb://localhost:27017');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/user',userRouter);

app.listen(3000, () => {
    console.log('server running on port ', 3000);
})