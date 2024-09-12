const http =require('node:http');

const server=http.createServer((req,res)=>{
    res.end("hello world");
})

server.listen(3000);
//the express framework is based on this http module which in turn runs due to libuv library(written in C)

//when we install node and npm npm start and npm test gets created in OS path
//so we write npm run for other scripts but npm start and npm test in abv case