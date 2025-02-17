import express from "express";
import {json} from 'express';
import dotenv from 'dotenv';
import Adminroute from './Routes/Adminroute.js'
import mongoose from "mongoose";


dotenv.config()
const app=express()

app.use(json());
app.use('/',Adminroute)

const Port=process.env.port

app.listen(Port,function(){
    console.log(`Server listening port ${Port}`);
    
});
mongoose.connect('mongodb://localhost:27017/Studentdetails')
  .then(() => {
    console.log('MongoDB Connected Successfully to Studentdetails');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });