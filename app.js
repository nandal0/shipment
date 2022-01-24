// const { RootRef } = require('@material-ui/core');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const {MONGOURI}=require('./keys');
console.log(MONGOURI);


mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo');
})
mongoose.connection.on('error',(err)=>{
    console.log('error in connection',err);
})

require('./models/user');
require('./models/post');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));




// app.get('/',(req,res)=>{
//     res.send('sdf')
// })

app.listen(8000,()=>{
    console.log('server is running')
})