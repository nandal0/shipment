const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types;
const postSchema=new mongoose.Schema({
    title:{
        type:'string',
        required:true
    }
    ,
    body:{type:String,
    required:true
    }
    ,
    likes:[{type:ObjectId,ref:"user"}] 
    ,
    comments:[
        {type:String,
            postedBy:{type:ObjectId,ref:"user"}
        }
    ],
    photo:{type:String,
required:true
    },

    postedBy:{type:ObjectId,ref:"user"}
})

mongoose.model("post",postSchema);  //post is the name of the collection    