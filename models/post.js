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
    photo:{type:String,
required:true
    },

    postedBy:{type:ObjectId,ref:"user"}
})

mongoose.model("post",postSchema);  //post is the name of the collection    