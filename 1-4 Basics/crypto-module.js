const crypto = require('crypto');

// supported hashes
// console.log(crypto.getHashes());

// Each hexadecimal character represents 4 bits (half a byte) because
// hexadecimal is base-16 (0-9 and A-F).

//get random bytes
crypto.randomBytes(16, (err, buf) => {
    // console.log(buf);
    // When you log the buffer directly, Node.js will show the Buffer
    // object with each byte displayed as two hexadecimal digits (just like
    // the hexadecimal string you get from buf.toString('hex')).
    // console.log(buf.toString('hex'));
})

//syn version
let randBytes=crypto.randomBytes(16);

//create hash
let hash = crypto
    .createHash('sha256')
    .update('your message')
    .digest('hex')
// console.log(hash);

// aes 256-bit cipher block chaining (cbc) encryption/decryption
let secret_message = ':)';
let key = '12345678123456781234567812345678';

//iv-initial vector
let cipher = crypto.createCipheriv('aes-256-cbc', key, randBytes);
let encrypted = cipher.update(secret_message, 'utf-8', 'hex'); 
//args-message,input encoding,output encoding
encrypted += cipher.final('hex');


console.log('encrypted: ' + encrypted)

let decipher = crypto.createDecipheriv('aes-256-cbc', key, randBytes);
let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
decrypted += decipher.final('utf-8');

console.log('decrypted: ' + decrypted)


