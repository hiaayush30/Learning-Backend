# Multer
- Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 
- <b>NOTE:</b> Multer will not process any form which is not multipart (multipart/form-data).

## Buffer
- A Buffer in Node.js is a special type of object used for storing binary data.
- It is similar to an array of integers, but specifically designed to handle raw binary data.
- In the context of crypto.randomBytes, it means the function generates a sequence of random bytes and stores them in a Buffer.

## Hexadecimal String
- A hexadecimal (hex) string is a way of representing binary data in a readable format, using base-16.
- Each byte of data is represented by two hexadecimal characters (0-9, a-f).
- Converting a Buffer to a hex string is useful because it makes the binary data more human-readable.
- <b><i>12 bytes of buffer=24 hexadecimal characters</i></b>
- <b><i>1 hex digit=4 bits</i></b>
## Summary
- <b>Buffer:</b> Raw binary data storage.
- <b>Hexadecimal String:</b> Readable representation of binary data, with each byte shown as two hex digits.