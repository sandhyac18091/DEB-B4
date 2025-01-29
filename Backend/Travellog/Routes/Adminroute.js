import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authenticate from "../Middleware/auth";
import adminCheck from "../Middleware/admincheck";
dotenv.config()

const Adminroute=Router()
const travel=new Map()
const secretkey=process.env.Secretkey

Adminroute.post('/Signup',async(req,res)=>{
    try{
        const{Firstname,Lastname,Email,Password,Userrole}=req.body
        const newp=await bcrypt.hash(Password,10)
        if(travel.get(Email)){
           
            res.status(400).json({message:'Email already exist'})
        }else{
            travel.set(Email,{
               Firstname,Lastname,Password:newp,Userrole
               
            })
            res.status(201).json({message:"Registered Successfully"})
            console.log(travel.get(Email));
            
        }
    }catch{
        res.status(500).json({message:'Internal server error'})
    }
});
Adminroute.post('/Login',async(req,res)=>{
   try{
    const{Email,Password}=req.body
    const result=travel.get(Email)
    if(!result){
        console.log('Enter valid email id');
        
    }else{
        const compare=await compare.bcrypt(Password,result.Password)
        console.log(compare);
        console.log(result.Userrole);
        
        if(compare){
            const token=jwt.sign({Email:Email,Userrole:Userrole},secretkey,{expiresIn:'1hr'})
            console.log(token);
            res.cookie('authToken',token,{
                httpOnly:true
            })
            res.status(200).json({message:'Login successfully'})
        }else{
            res.status(401).json({message:'Unauthorised access'})
        }
        
    }
   }catch{
    res.status(500).json({message:'Internal server error'})
   }
})
Adminroute.post('/addlog',authenticate,adminCheck,(req,res)=>{
    const{Logtitle,Location,Dateoftravel,Description}=req.body
    if(travel.get(Logtitle)){
        res.status(403).json({message:"Already "})
    }
})

export default Adminroute;