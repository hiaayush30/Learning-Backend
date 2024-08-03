const mongoose =require('mongoose');

mongoose.connect(process.env.CONNECTION_URL).then(()=>{
    console.log('database connected!')
}).catch((err)=>{
    console.log(err);
})
module.exports=mongoose.connection;