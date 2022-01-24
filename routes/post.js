const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Post= mongoose.model('post')
const requireLogin = require('../middleware/requireLogin')

router.get('/as',requireLogin, (req, res) => {
    console.log(req.user);
    res.send('sdfsdfdsfdfljklk');
})

router.get('/allpost',(req,res)=>{
    Post.find()
    .populate('postedBy')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req, res)=>{
    console.log(req.user);
    Post.find({postedBy:req.user._id})
    .populate('postedBy',"_id name")
    .then(posts=>{
        res.json({posts})
    })
    .then(data=>{
        setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })

   
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic}=req.body;
    if(!title || !body ||!pic){
        return res.status(402).json({error:"invalid input"})
    }
    console.log("user" ,req.user);
    // res.send(json({message:req.user}))
    // res.send("ok")
    req.user.password=undefined;
    const post= new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    
    post.save().then(result=>{
        res.json({post: result})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})




router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})


module.exports=router;