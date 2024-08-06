//using Multer with error handling
const path = require('path');
const express = require('express');
const multerConfig = require('./config/multerConfig');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
    return res.render('index');
});

const upload = multerConfig.upload.single('myFile');

app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
        // Everything went fine.
        res.send('file uploaded successfuly!');
    });
})


app.listen(3000, () => {
    console.log('server running on port ', 3000);
})