//connect-flash
const express = require('express');
const users = require('./MOCK_DATA.json');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectflash=require('connect-flash');
const app = express();

app.use(session({
    secret: "mysecretstring",
    resave: false,
    saveUninitialized: true
}))
app.use(connectflash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser('secretcode'));


app.get('/register',(req,res)=>{
    let {name="default"}=req.query
    req.session.name=name;
    console.log(req.session);
    req.flash('msg','signed in successfully!');
    res.redirect('/hello');
})

app.get('/hello',(req,res)=>{
    const message=req.flash('msg');
    res.render('index',{message,name:req.session.name});
})

app.get('/', (req, res) => {
    res.cookie('color', 'red', { signed: true });
    res.render('index');
});

app.get('/verify', (req, res) => {
    console.log(req.cookies);   //shows unsigned cookies
    console.log(req.signedCookies);
    res.send(req.signedCookies.color);
})

//storing and accessing variables in session storage
app.get('/reqcount', (req, res) => {
    //the express session stores the value of req.session.count across request made from the same user
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`you sent a request ${req.session.count} times!`);
})

app.listen(3000, () => {
    console.log(`sever running on port 3000`);
})