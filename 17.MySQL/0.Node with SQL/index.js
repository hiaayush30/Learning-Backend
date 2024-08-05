//using Faker,mysql2
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: process.env.DB_PASSWORD
});
 let query='SHOW TABLES;'; //pass this query as the 1st argument below
try{
    connection.query("SHOW TABLES", (err, results, fields) => {
        if(err) throw err;
        console.log(results); // results contains rows returned by server
        console.log(results.length);
        // console.log(fields); // fields contains extra meta data about results, if available
    }
)
}catch(err){
    console.log(err.message);
}
connection.end();

let getRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

console.log(getRandomUser());