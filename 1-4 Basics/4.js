const express=require('express');
const path=require('node:path');  //or just 'path'
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//used to set EJS (Embedded JavaScript) as the template engine for rendering views.
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
//__dirname is the path to my current folder
//path.join() simply doing __dirname+/public
//express.static() is a middleware function that
//serves static files such as images, CSS files, Js files, etc.,
//from a directory specified by you.

app.get('/',(req,res)=>{
    res.render('example')
}); 
app.get('/profile/:username',(req,res)=>{
    res.json({
        msg:`hello ${req.params.username}!`
    })
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})