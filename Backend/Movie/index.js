import express from 'express';
import json from 'express';
import dotenv from 'dotenv';
import adminroute from './Routes/adminroute.js';

dotenv.config()
const app=express()
app.use(json())
app.use('/',adminroute)

const Port=process.env.port
app.listen(Port,function(){
    console.log(`Server running port ${Port}`);
    
});