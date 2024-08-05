//inserting in bulk using faker
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: process.env.DB_PASSWORD
});
 let getRandomUser = () => {
    return[
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ]
}
let myArray=[];
for(let i=0;i<10;i++){
    myArray.push(getRandomUser());
}
console.log(myArray);

let query="INSERT INTO user(id,username,email,password) VALUES ?; "
try{
    connection.query(query,[myArray], (err, results, fields) => {
        if(err) throw err;
        console.log(results);
    })
}catch(err){
    console.log(err.message);
}
connection.end();