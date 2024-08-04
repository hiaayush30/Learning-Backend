const express=require('express');
const users=require('./MOCK_DATA.json');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//parses the body whose request's header has form-urlencoded as it's content-type
//(built-in header) and makes it availbale to us in req.body

app.get('/api/users',(req,res)=>{
    res.setHeader('X-creatorName','Aayush Jha'); //custom header
    //X- to represent that it is a custom header
    res.json(users); 
});

app.get('/users',(req,res)=>{
    const html=`<ul>
    ${users.map((user)=>{ 
        return `<li>
            <h2>${user.first_name}</h2>
            <h4>${user.email}</h4>
        </li>`
    }).join('')}
    </ul>`;
    res.send(html);
});

// app.get('/api/users/:id',(req,res)=>{
//     const id=req.params.id;
//     const user=users.find(user=>user.id==id);
//     console.log(user);
//     if(user){ 
//         res.send(user);
//     }else{
//         return res.send('user not found!');
//     }
    
// })

app.post('/api/users/',(req,res)=>{
    res.status(201).json({
       msg:"pending",
    })
})

// app.patch('/api/users/:id',(req,res)=>{
//     res.json({
//         msg:"pending",
//     })
// })

// app.delete('/api/users/:id',(req,res)=>{
//     res.json({
//         msg:"pending",
//     })
// })

app.route('/api/users/:id').get((req,res)=>{
        const id=Number(req.params.id);
        const user=users.find(user=>user.id===id);
        console.log(user);
        if(user){ 
            res.send(user);
        }else{
            return res.status(404).send('user not found!');
        } 
    }
).patch((req,res)=>{
    res.json({
        msg:"pending",
    })
}).delete((req,res)=>{
        res.json({
            msg:"pending",
        })
    }
)
app.listen(3000,()=>{
    console.log(`sever running on port 3000`);
})