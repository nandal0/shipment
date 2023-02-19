const mongoose = require('mongoose');
// const {ObjectId}=mongoose.Schema.Types;

const dataSchema=new mongoose.Schema({
    firstName:{
        type: 'string'
    },
    lastName:{
        type: 'string'
    },
    email:{
        type: 'string'
    },
    password:{
        type: 'string'
    },
    number:{
        type: 'string'
    },
    address1:{
        type: 'string'
    },
    address2:{
        type: 'string'
    },
    

    
})

mongoose.model("data",dataSchema);

