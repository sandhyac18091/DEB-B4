import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/admincheck.js";
import add from '../Models/addlog.js'

const Userroute=Router()
const travel=new Map()
Userroute.post('/addlog',authenticate,adminCheck,async(req,res)=>{
    try{
        const{Logid,Logtitle,Location,Dateoftravel,Description,Rating}=req.body
        const existinglog=await add.findOne({logid:Logid})
    if(existinglog){
        res.status(403).json({message:"Already exist this logid"})
    }else{
        const newUser=new add({
            logid:Logid,
            logtitle:Logtitle,
            location:Location,
            dateoftravel:Dateoftravel,
            description:Description,
            rating:Rating
        })
        await newUser.save();
        res.status(201).json({message:'log Successfully added'})
        
        
    }
    }catch{
        console.log(error);
        res.status(500).json({message:'Internal Server error'})
        
    }
})
Userroute.get('/getlog:Location',async(req,res)=>{
    const location=req.params.Location
    console.log(location)
    const getlog=await add.findOne({logid:Logid})
    if(getlog){
        res.send(getlog)
        
    }else{
        res.status(400).json({message:'Log not found'})
    }
})
Userroute.put('/Updatelog',authenticate,(req,res)=>{
    const{Dateoftravel,Description,Chooseimage}=req.body
    if(travel.get()){}
    
})
export default Userroute;