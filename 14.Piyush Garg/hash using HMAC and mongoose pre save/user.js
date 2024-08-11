const mongoose = require('mongoose');
const { type } = require('node:os');
const { createHmac, randomBytes } = require('node:crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    salt: {
        type: String,
        require: true,
    },
    profileImageUrl: {
        type: String,
        default: '/images/default.jpeg'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, { timestamps: true });


//This line sets up a middleware function that runs before a user document is saved to the database.
//The pre method is used to specify that this function should be executed before the save operation.
userSchema.pre('save', function (next) {
    //this refers to the current instance of the user document being saved. 
    // you can't directly write user.isModified without first assigning this to user.
    // The isModified method is part of the Mongoose document instance, and this within the 
    // context of a Mongoose pre-save hook refers to the document being saved.
    const user = this;
    //The isModified method checks if password field has been modified since the document was last saved.
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashed = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex");
    // The createHmac function creates a Hash-based Message Authentication Code (HMAC) using the SHA-256
    // algorithm and the generated salt. The .update(user.password) method hashes the user's password 
    // with the salt, and .digest("hex") converts the hash into a hexadecimal string.
    this.salt = salt;     //or user.salt as we have set user to point to this
    this.password = hashed;
    next();
})


userSchema.static("matchPassword", async function (email, password) {
    try {
        const user = await this.findOne({ email });
        if (!user) throw new Error('user not found!');
        const salt = user.salt;
        const hashedPassword = user.password;
        const userProvidedPass = createHmac('sha256', salt)
            .update(password)
            .digest('hex');
        if (hashedPassword === userProvidedPass) return { ...user._doc,password: undefined,salt: undefined };
        else throw new Error('Incorrect password');
    } catch (err) {
        console.log(err.message);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;