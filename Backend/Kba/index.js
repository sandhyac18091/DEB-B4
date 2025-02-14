import express from 'express';
import dotenv from 'dotenv';
import { json } from 'express';
import {auth} from './Routes/auth.js'
import { userroute } from './Routes/userroute.js';
import admin from './Routes/adminsign.js'
import cors from 'cors';

dotenv.config();
const app=express();
app.use(cors({
    origin:'*',//* is a wild card  the request come anywhere,anyone can enter
    credentials:true
}))

app.use(json())
app.use('/',auth);
app.use('/',userroute)
app.use('/Admin',admin)


const Port=process.env.port
app.listen(Port,function(){
    console.log(`server is listening at ${Port}`);
    
});
