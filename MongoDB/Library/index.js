import express from 'express';
import dotenv from 'dotenv';
import { json } from 'express';
import {adminroute} from './Routes/adminroute.js'
import cors from 'cors';
import mongoose from 'mongoose';
import {userroute} from './Routes/userroute.js'


dotenv.config()
const app=express();
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(json());
app.use('/',adminroute)
app.use('/',userroute)

const port=process.env.Port;
app.listen(port,function(){
    console.log(`server listening to ${port}`);
    
})
mongoose.connect('mongodb://localhost:27017/Library')
  .then(() => {
    console.log('MongoDB Connected Successfully to Library');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });