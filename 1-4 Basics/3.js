const express = require('express');
const app=express();
//on submiting a form the data gets sent to the backend as a blob(unreadable stream in hexadecimal)
//the term blob used abv is actually incorrect as it refers o data in binary form

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// express.urlencoded(): This is a built-in middleware function in Express. It parses incoming requests
// with URL-encoded payloads (data sent using HTML forms with the application/x-www-form-urlencoded MIME type).

// extended: true: The extended option specifies the parsing algorithm. 
// When extended is set to true, it allows the use of the qs library to parse nested objects,
// which can result in a more complex object structure(user[name],user[age]). If extended is set to false, the 
// querystring library is used, which can only parse simple key-value pairs.



app.get('/',(req,res)=>{
    res.send('<h1>Hello There!</h1>');
});

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})