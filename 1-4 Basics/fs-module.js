// const fs=require('node:fs');
const fs=require('fs'); 
const os=require('os');
console.log(os.cpus().length);
// writeFile
// read file
// appendFile
// copyFile 
// rename
// unlink
// rmdir

// fs.writeFile("hey.txt","hey hello kaise ho!",(err)=>{
//     if(err)console.log(err);
//     else console.log('done!');    
// })

// fs.readFile('./yo.txt',{encoding:'utf-8'},(data,err)=>{
//     if(err) console.log(err);
//     else console.log(data);
// })
// //or
// const result=fs.readFileSync('./yo.txt',{encoding:'utf-8'});

// fs.appendFile("hey.txt"," hello there!",(err)=>{
//     if(err)console.log(err);
//     else console.log('done!');    
// })

// fs.rename("hey.txt","hello.txt",(err)=>{
//     if(err) console.log(err);
// })

// fs.copyFile("hello.txt","copied.txt",(err)=>{
//     if(err) console.log('Error occured::',err.message || err);
//     else console.log('copied successfully!');
// })

// fs.unlink("copied.txt",(err)=>{
//    if(err)console.log(err.message || err)
//    else console.log('deleted!'); 
// })

// fs.rm("./temp",{recursive:true},(err)=>{
//     if(err)console.log('ERROR::',err.message)
//         else console.log('deleted');
// })

// fs.mkdir("./temp/new",{recursive:true},(e)=>{
//     if(e)console.log(e);
//     else console.log('done');
// })

// try{
// const content=fs.readFileSync("yo.txt",{encoding:'utf-8'});
// console.log(content)
// }catch(e){
//     console.log('Sth went wrong!:',e.message);
// }

// console.log('end of code!');