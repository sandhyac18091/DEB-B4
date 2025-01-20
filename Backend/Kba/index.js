import express from 'express';
import dotenv from 'dotenv';
import {auth} from './Routes/auth.js'

dotenv.config();
const app=express();
// app.get('/',(req,res)=>{
//     res.send('hello everyone')
// })
app.use('/',auth);
app.get('/',function(req,res){
    
    
    res.send("Hello everyone");
}) 
const Port=process.env.port
app.listen(Port,function(){
    console.log(`server is listening at ${Port}`);
    
});
