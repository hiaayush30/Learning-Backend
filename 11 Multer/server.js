require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
const crypto = require('node:crypto');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads') 
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, bytes) => { 
            const fileName = bytes.toString('hex') + path.extname(file.originalname);
            cb(null, fileName);
        }) 
    }
})

const upload=multer({storage:storage});

app.get('/', (req, res) => {
    res.render('form');
});

app.get('/upload', (req, res) => {
    res.render('file');
});

app.post('/upload',upload.single('theImage'), (req, res) => {
    console.log(req.file);
    res.send('file uploaded!');
})
app.listen(process.env.PORT, () => {
    console.log('server running on ' + process.env.PORT);
})