import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticate } from '../Middleware/auth.js';
import adminCheck from '../Middleware/admincheck.js';
import certidapp from '../Models/certiapp.js';
import issuecert from '../Models/issue.js';

dotenv.config()
const Adminroute=Router()


const seceretkey=process.env.Secretkey;

Adminroute.post('/signup',async(req,res)=>{
    try{
        const{Fullname,Username,Email,Password,Userrole}=req.body
        const newp=await bcrypt.hash(Password,10)
        const existinguser=await certidapp.findOne({username:Username})
    if(existinguser){
        res.status(401).json({message:'Username already exist'})
    }else{
        const newUser=certidapp({
            fullname:Fullname,
            username:Username,
            email:Email,
            password:newp,
            userrole:Userrole
        })
           await newUser.save()
            res.status(201).json({message:'Successfully signedup'})
            
    }
            
    }catch{
        res.status(500).json({message:'Internal server error'})
    }
    
        
});
Adminroute.post('/login',async(req,res)=>{
   try{
    const{Username,Password}=req.body
    const result=await certidapp.findOne({username:Username})
    console.log(result);
    
    if(!result){
        console.log('Enter valid username');
        
    }else{
        const compare=await bcrypt.compare(Password,result.password)
        console.log(compare);
        console.log(result.userrole);
        if(compare){
            const token=jwt.sign({Username:result.username,Userrole:result.userrole},seceretkey,{expiresIn:'1hr'})
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
Adminroute.post('/issuecertificate',authenticate,adminCheck,async(req,res)=>{
   try{
    const{Selectcourse,Certificateid,Candidatename,Selectgrade,Issuedate}=req.body
    // console.log(req.body);
    
    const existinguser=await issuecert.findOne({certificateid:Certificateid})
    if(existinguser){
        res.status(403).json({message:'Certificate id already exist'})
    }else{
        const newUser= new issuecert({
            selectcourse:Selectcourse,
            certificateid:Certificateid,
            candidatename:Candidatename,
            selectgrade:Selectgrade,
            issuedate:Issuedate
        })
        await newUser.save()
        res.status(201).json({message:'Certificate issued successfully'})

        // console.log(newUser);
        
        
    }
   }catch{
    res.status(500).json({message:'Internal server error'})
   }
        
});
Adminroute.get('/getcertificate/:Certificateid', async (req, res) => {
    try {
        const certi = req.params.Certificateid;
        console.log("Certificate ID:", certi);

        
        const certificate = await issuecert.findOne({ certificateid: certi });

        if (certificate) {
            console.log("Certificate Found:", certificate);
            res.status(200).json({ message: "Certificate found", certificate });
        } else {
            res.status(404).json({ message: "Certificate not available" });
        }
    } catch (error) {
        console.error("Error fetching certificate:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
Adminroute.get('/logout',(req,res)=>{
    res.clearCookie('certiappToken')
    res.status(200).json({message:'Logout successfully'})
  })

export default Adminroute;
