import express from 'express'
import {json} from 'express'
import dotenv from 'dotenv'
import Adminroute from './Routes/Adminroute.js'

dotenv.config()


const app=express()
app.use(json())
app.use('/',Adminroute)


const port=process.env.Port

app.listen(port,function(){
    console.log(`Server running ${port}`);
    
})
