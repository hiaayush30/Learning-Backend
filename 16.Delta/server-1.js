//Express Session and session storage
const express = require('express');
const users = require('./MOCK_DATA.json');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(session({
    secret: "mysecretstring",
    resave: false,
    saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser('secretcode'));

//send signed cookies
app.get('/', (req, res) => {
    res.cookie('color', 'red', { signed: true });
    res.render('index');
});

//verify incomming signed cookies
app.get('/verify', (req, res) => {
    console.log(req.cookies);   //shows unsigned cookies
    console.log(req.signedCookies);
    res.send(req.signedCookies.color);
    //if value is tampered with it will show false but if anything other than value is changed,
    //it will show cookie name and false
})

//storing variables in session storage (req.session)
app.get('/register',(req,res)=>{
    let {name="default"}=req.query
    req.session.name=name;
    console.log(req.session);
    res.redirect('/hello');
})

//accessing variables from session storage
app.get('/hello',(req,res)=>{
    res.send(`hello ${req.session.name}`);
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