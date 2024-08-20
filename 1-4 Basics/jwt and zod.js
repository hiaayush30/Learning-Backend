const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod=require('zod'); 

const tokenSchema=zod.object({
    username:zod.string(),
    password:zod.string().min(6)
})

function signJwt(username, password) {
    const response=tokenSchema.safeParse({username,password});
    if(!response.success) return null;
    else{
        const token=jwt.sign({username,password},jwtPassword);
        return token;
    }
}

// jwt.decode returns null if it can't deocode
// jwt.verify throws an error which we will have to catch
// jwt.decode(token) decodes token and NOT verifies it 

