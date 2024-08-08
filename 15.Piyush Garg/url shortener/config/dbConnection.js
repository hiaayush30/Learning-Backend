const mongoose=require('mongoose');

const dbConnection=(url)=>{
   mongoose.connect(url)
   .then(()=>{console.log('db connected!');})
   .catch((err)=>{console.log('mongoose error:'+err);})
}

module.exports=dbConnection;