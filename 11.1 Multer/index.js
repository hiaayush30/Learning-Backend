const path=require('path');
const express=require('express');
const multerConfig=require('./config/multerConfig');
const app =express();

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.get('/',(req,res)=>{
   return res.render('index');
});

const upload=multerConfig.upload;

app.post('/upload',upload.single('myFile'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    //req.file.path can be saved in the database of the user;
    res.redirect('/');
})


//uploading multiple files at once
app.get('/multiple',(req,res)=>{
    return res.render('index2');
 });

app.post('/uploadMultiple',upload.fields([{ name: 'myFile1', maxCount: 1 }, { name: 'myFile2', maxCount: 1}]),(req,res)=>{
    console.log(req.files);
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log('server running on port ',3000);
})