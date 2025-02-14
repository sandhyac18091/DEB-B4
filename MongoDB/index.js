import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/sample.js'

dotenv.config();
const app=express();
 app.use(express.json());
app.use('/',routes)

const Port=process.env.port
app.listen(Port,function(){
    console.log(`server is listening at ${Port}`);
    
});
mongoose.connect('mongodb://localhost:27017/StudentDB')