//inserting in user table using placeholders
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: process.env.DB_PASSWORD
});
 let query='INSERT INTO user (id,username,email,password) VALUES(?,?,?,?);'

 let user=[12,"aayush","aayush@gmail.com","123"];
 //or
 let getRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}
const {id,username,email,password}=getRandomUser();

//for multiple entries at once
let userArray=[[15,"ROBIN","robin@gmail.com","123"],[14,"bruce","bruce@gmail.com","123"]];
let query2='INSERT INTO user (id,username,email,password) VALUES ?;'

try{
    connection.query(query,[id,username,email,password], (err, results, fields) => {
        if(err) throw err;
        console.log(results);
    })
    connection.query(query,user,(err, results, fields) => {
        if(err) throw err;
        console.log(results); 
    })
    connection.query(query2,[userArray],(err, results, fields) => {
        if(err) throw err;
        console.log(results); 
    })
}catch(err){
    console.log(err.message);
}
connection.end();

console.log(getRandomUser());