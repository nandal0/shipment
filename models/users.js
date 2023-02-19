const mongoose=require('mongoose');
// const {ObjectId}=mongoose.Schema.Types;

const usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true,
        unique:true
    }
    ,
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },

})

mongoose.model("users",usersSchema);