const express = require('express');
require('dotenv').config();
const app = express();
const mysql2 = require('mysql2');

app.set('view engine', 'ejs');

const connection = mysql2.createConnection({
    database: 'test',
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS
})

//show number of users in DB
app.get('/home', (req, res) => {
    const query = 'SELECT COUNT(id) FROM user;'
    try {
        connection.query(query, (err, result) => {
            console.log(result);
            res.send('the number of users in the db is:');
        })
    } catch (err) {
        res.send('something went wrong!');
    }
})

app.get('/users', (req, res) => {
    const query = 'SELECT id,username,email FROM user;'
    try {
        connection.query(query, (err, result) => {
            console.log(result);
            res.render('displayUsers', { users: result });
        })
    } catch (err) {
        res.send('something went wrong!');
    }
})

app.patch('/user/:id', (req, res) => {
    const name = req.query.name || null;
    const id = req.params.id;
    if (name) {
        try {
            const query = `UPDATE user SET username= ? WHERE id= ?`;
            const values=[name,id];
            connection.query(query,values,(err, result) => {
                if (err) throw err;
                console.log(result);
                res.send('username updated successfully!');
            })
        } catch (err) {
            console.log(err);
            res.send('something went wrong!');
        }
    }
})

app.listen(3000, () => {
    console.log('server running on port ', 3000);
})