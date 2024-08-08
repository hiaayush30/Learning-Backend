const express=require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('welcome to user route!');
});

router.post('/new',(req,res)=>{
    //userController.createUser();
})
router.get('/:id',(req,res)=>{
    //userController.getUser();
})

router.route('/yo').post(/*myControllerFn*/).get(/*getController*/);

module.exports=router;