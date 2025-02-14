import express from 'express';
import dotenv from 'dotenv';
import { json } from 'express';
import {adminroute} from './Routes/adminroute.js'
import cors from 'cors';


dotenv.config()
const app=express();
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(json());
app.use('/',adminroute)

const port=process.env.Port;
app.listen(port,function(){
    console.log(`server listening to ${port}`);
    
})