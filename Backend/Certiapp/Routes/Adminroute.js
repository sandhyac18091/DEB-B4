import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticate } from '../Middleware/auth.js';

dotenv.config()
const Adminroute=Router()
const Certi=new Map()
const Certificate=new Map()

const seceretkey=process.env.Secretkey;

Adminroute.post('/signup',async(req,res)=>{
    try{
        const{Fullname,Username,Email,Password,Userrole}=req.body
        const newp=await bcrypt.hash(Password,10)
    if(Certi.get(Username)){
        res.status(401).json({message:'Username already exist'})
    }else{
        Certi.set(Username,{
            Fullname,Email,Password:newp,Userrole});
            res.status(201).json({message:'Successfully signedup'})
            console.log(Certi.get(Username));
    }
            
    }catch{
        res.status(500).json({message:'Internal server error'})
    }
    
        
});
Adminroute.post('/login',async(req,res)=>{
   try{
    const{Username,Password}=req.body
    const result=Certi.get(Username)
    if(!result){
        console.log('Enter valid username');
        
    }else{
        const compare=await bcrypt.compare(Password,result.Password)
        console.log(compare);
        console.log(result.Userrole);
        if(compare){
            const token=jwt.sign({Username:Username,Userrole:result.Userrole},seceretkey,{expiresIn:'1hr'})
            console.log(token);
            res.cookie('certiappToken',token,{
                httpOnly:true
            })
            res.status(201).json({message:'Login successfully'})
            
        }else{
            res.status(401).json({message:'Unauthorised access'})
        }
        
    }
   }catch{
    res.status(500).json({message:'Internal server error'})
   }
})
Adminroute.post('/issuecertificate',authenticate,(req,res)=>{
   try{
    const{Selectcourse,Certificateid,Candidatename,Selectgrade,issuedate}=req.body
    if(Certificate.get(Certificateid)){
        res.status(403).json({message:'Certificate id already exist'})
    }else{
        Certificate.set(Certificateid,{
            Selectcourse,Candidatename,Selectgrade,issuedate
        })
        res.status(201).json({message:'Certificate issued successfully'})
        console.log(Certificate.get(Certificateid));
        
    }
   }catch{
    res.status(500).json({message:'Internal server error'})
   }
        
});
Adminroute.get('/getcertificate/:Certificateid',(req,res)=>{
    const certi=req.params.Certificateid
    console.log(certi);
    if(Certificate.get(certi)){
        console.log(Certificate.get(certi));
        
    }else{
        res.status(400).json({message:'Certificate not availabel'})
    }
    
})
export default Adminroute;
