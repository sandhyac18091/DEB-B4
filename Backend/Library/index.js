import express from 'express';
import dotenv from 'dotenv';
import { json } from 'express';
import {adminroute} from './Routes/adminroute.js'


dotenv.config()
const app=express();
app.use(json());
app.use('/',adminroute)

const port=process.env.Port;
app.listen(port,function(){
    console.log(`server listening to ${port}`);
    
})