const multer = require('multer');
const crypto = require('node:crypto');
const path = require('node:path');
//diskStorage setup
//create upload variable and export it

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')//give the location where file will be saved
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, bytes) => {
            //bytes is in buffer which is converted to hexadecimal string
            //file.originalname is the name of the file(with extension) as uploaded by the user 
            //path.extname() extracts the extension from the file name
            const fileName = bytes.toString('hex') + path.extname(file.originalname);// generate unique file name
            cb(null, fileName)
        })
    }
})

const upload = multer({ storage: storage });

module.exports = { upload };