const jwt=require('jsonwebtoken');
const validateUser = function (req, res, next) {
    if (!req.cookies.token){
      console.log('cookie not found!');
      next();
    }else{
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
      req.user = { ...decoded };
      console.log('req.user',req.user)
      next();
    } catch (err){
      console.log('userValidation error:',err.message);
      next();
    }}
}

module.exports = { validateUser }