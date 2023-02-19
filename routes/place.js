const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Place=mongoose.model('place')


router.post('/placeadd',(req,res)=>{
    console.log(req.body);
    const {longitude,latitude,title} = req.body;

   
    const data =new Place({
    title:title,
        loc: { type: "Point", coordinates: [longitude, latitude] }
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

router.post('/place',(req,res)=>{

    const {longitude,latitude} = req.body;
    const options = {
        // loc: {
        //     $geoWithin: {
        //         $centerSphere: [[29.09204919785959, 76.97649935581796], 15 / 3963.2]
        //     }
        // }
        // loc:
        // { $near :
        //    {
        //      $geometry: { type: "Point",  coordinates: [29.092565884304566, 76.97839683867811] },
        //      $minDistance: 1000,
        //      $maxDistance: 3000
        //    }
        // }

        loc: {
            $nearSphere: {
               $geometry: {
                  type : "Point",
                  coordinates : [ 29.129356798806402, 77.03043974117465 ]
               },
               $minDistance: 1000,
               $maxDistance: 3000
            }
         }
    }
    Place.find(options).then(data => {
        res.send(data);
    })   .catch(err=>{  
        console.log(err)
    })
})


module.exports=router;