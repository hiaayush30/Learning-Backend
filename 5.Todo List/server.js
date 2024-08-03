const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir('./files', (e, files) => {
        if (e) console.log(`error occured::${e}`);
        console.log(files);
        res.render('tasks', { files: files })
    })
});

app.post('/create', (req, res) => {
    console.log(req.body);
    if (req.body.title.trim() == '') {
        res.redirect('/');
        return;
    }
    try {
        const filename = req.body.title.replace(' ', '') + '.txt'
        console.log(filename);
        fs.writeFile('./files/' + filename, req.body.desc, (error) => {
            if (error) console.log(error);
            else console.log('done');
        })
        res.redirect('/');
    } catch (e) {
        console.log(e);
        alert('something went wrong!');
    }
})

app.get('/files/:file', (req, res) => {
    const file = req.params.file;
    fs.readFile(`files/${file}`, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        else { res.render('show', { file: file,data:data }); }
    })
})
app.get('/edit/:file',(req,res)=>{
    res.render('editFile',{fileName:req.params.file.split('.txt')[0]});
})
app.post('/edit/:file',(req,res)=>{
    const oldName=req.params.file;
    console.log(oldName);
    const newName=req.body.newName;
    console.log(newName);
    fs.rename('./files/'+oldName+'.txt','./files/'+newName+'.txt',(err)=>{
        if(err)console.log(err);
        res.redirect('/');
    })
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
})