const mongoose = require('mongoose');

async function connectDb(url) {
    return mongoose.connect(url)
        .then(() => { console.log('db connected!') })
        .catch((err) => { console.log('Mongo error:' + err) });
}

module.exports = { connectDb }; 