const jwt=require('jsonwebtoken');
const validateUser = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) next();
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
      req.user = { ...decoded };
      console.log('req.user',req.user)
      next();
    } catch (err){
        console.log(err.message);
        next()
    }
}

module.exports = { validateUser }