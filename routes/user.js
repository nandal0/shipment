const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Post= mongoose.model('post')
const User= mongoose.model('user')
const requireLogin = require('../middleware/requireLogin')

router.get('/user/:id',requireLogin,(req,res)=>{
    console.log(req.params.id);
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})
router.put('/follow',requireLogin,(req,res)=>{
    console.log(req.body.followId)
    User.findByIdAndUpdate(req.body.followId,{
        $push:{follower:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      }) 

    }
    )
})

router.put('/unfollow',requireLogin,(req, res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{follwer:req.user._id}
    },{new :true}
    ,
    (err,result)=>{
        if(err) return res.status(422).json({error:err})
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}

        },{new :true}

        
        ).select("-password")
        .then(result=>{
            res.json(result);
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    }
    )
})

router.put('/updatepic',requireLogin,(req, res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pics:req.body.pics}}
        ,{new:true},
        (err,result)=>{
            if(err){
                res.status(500).json({error:err})
            }
            return json(result);
        }
        )
    
})


module.exports=router;