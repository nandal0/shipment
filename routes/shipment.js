const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Shipment=mongoose.model('Shipment')
const Users=mongoose.model('users')


router.post('/contactUs',(req, res) => {
    const {name, email,phone,message} = req.body;
    const users =new Users({
        name, phone ,email,message  })
    users.save()
    .then(data=>{
        res.json({data:data})
    })
    .catch(err=>{  
        console.log(err)
    })
})

router.get('/allUsers',(req,res)=>{
    Users.find()
    .then(data=>{
        res.json({data})
    })
    .catch(err=>console.log(err));

 })


router.post('/registerShipment',(req, res)=>{
    // console.log(req.body)
    const { name, phone ,email,destination,product,quantity,images,notes,marketing} = req.body;
    console.log(req.body);
    // const {firstName,lastName,email,password,number,address1,address2} = req.body.data;
    // console.log(firstName,lastName,email,password,number,address1,address2);
   
    const shipment =new Shipment({
        name, phone ,email,destination,product,quantity,images,notes,marketing    })
    shipment.save()
    .then(data=>{
        res.json({data:data})
    })
    .catch(err=>{  
        console.log(err)
    })
   
 });

 router.get('/allShipment',(req,res)=>{
    Shipment.find()
    .then(data=>{
        res.json({data})
    })
    .catch(err=>console.log(err));

 })






    

module.exports=router;
