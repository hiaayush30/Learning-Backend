const fs=require('fs');
const logRequest=(req,res,next)=>{
    const dateTime = new Date().toLocaleString();
    const logMessage = `Date:${dateTime}\nPath:${req.path}\nMethod:${req.method}\n`;
    fs.appendFile('log.txt',logMessage,(err)=>{
        if(err)console.log(err);
        else console.log('new request!');  
    })
    next(); 
}

module.exports=logRequest;