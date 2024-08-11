const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log('db Connected!');
    } catch (err) {
        console.log('db connection error:' + err);
    }
}

module.exports = dbConnection;