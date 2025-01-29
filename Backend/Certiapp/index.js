import express from "express";
import {json} from 'express';
import dotenv from 'dotenv';
import Adminroute from './Routes/Adminroute.js'

dotenv.config()
const app=express()
app.use(json());
app.use('/',Adminroute)

const Port=process.env.port

app.listen(Port,function(){
    console.log(`Server listening port ${Port}`);
    
});