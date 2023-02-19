const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Data=mongoose.model('data')
router.get('/data',(req, res)=>{
    // console.log(req.body);
    Data.find()
    .then(data=>{
        res.json({data})
    })
    .catch(err=>console.log(err));

    
})

router.post('/editing',(req, res)=>{
    console.log(req.body);
    console.log(req.body.data.firstName);
    Data.findByIdAndUpdate(req.body.id,{
        $set:{
            firstName:req.body.data.firstName,
            lastName:req.body.data.lastName,
            email:req.body.data.email,
            
            number:req.body.data.number,
            address1:req.body.data.address1,
            address2:req.body.data.address2,

        }
    },{new:true})
    .then(data=>{
        
        res.json({data})
    })
    .catch(err=>console.log(err));
})

router.post('/for',(req,res)=>{
    console.log(req.body);
    const {firstName,lastName,email,password,number,address1,address2} = req.body.data;
    console.log(firstName,lastName,email,password,number,address1,address2);
   
    const data =new Data({
     firstName,lastName,email,password,number,address1,address2
    })
    data.save()
    .then(data=>{
        res.json({data:data})
    })
    .catch(err=>{  
        console.log(err)
    })

    // res.send(json({message:req.user}))
    // res.send("ok")
   
    
})


router.get('/edit/:id',(req, res)=>{
    console.log(req.params.id);
    // res.send('helo')
    Data.findOne({_id:req.params.id}).
    then(data=>{
        res.json({data})
    })
})


module.exports=router;