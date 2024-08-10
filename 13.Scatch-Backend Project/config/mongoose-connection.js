const mongoose =require('mongoose');
const dbgr=require('debug')("development:mongoose");
//namespace
//development is the status of the server and mongoose is where the connection is coming from

mongoose
.connect(process.env.CONNECTION_URL+'/Scatch').then(()=>{
    console.log('database connected!')
}).catch((err)=>{
    console.log(err); 
})

module.exports=mongoose.connection;