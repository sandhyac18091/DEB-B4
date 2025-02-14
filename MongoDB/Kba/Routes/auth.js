import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sample from '../Model/signup.js'

dotenv.config();
const auth = Router();

const secretkey=process.env.Secretkey;
auth.get('/', (req, res) => { //callback function
  res.send('Hello world')
})


auth.post('/signup',async(req,res)=>{
  try{
      const{firstname,lastname,username,password,Userrole}=req.body
      const newp=await bcrypt.hash(password,10)
      const existinguser=await sample.findOne({Username:username})
  if(existinguser){
      res.status(401).json({message:'Username already exist'})
  }else{
      const newUser=sample({
        Firstname:firstname,
        Lastname:lastname,
        Username:username,
        Password:newp,
        userrole:Userrole
      })
         await newUser.save()
          res.status(201).json({message:'Successfully signedup'})
          
  }
          
  }catch{
      res.status(500).json({message:'Internal server error'})
  }
  
      
});
auth.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const result =await sample.findOne({Username:username})
    if (!result) {
      console.log('enter valid username');

    } else {
      console.log(result.Password);
      const compare = await bcrypt.compare(password, result.Password)
      console.log(compare);
      console.log(result.userrole);
      
      if (compare) {
        const token=jwt.sign({username:username,Userrole:result.userrole},secretkey,{expiresIn:'1hr'})//sign function used to create token username and role is payload,using secretkey to use sign the payload, expiresin used for token validity
        console.log(token);
        res.cookie('userToken',token,{
          httpOnly:true //not accessing this to using javascript code for security purpose
        })
        
        res.status(200).json({ message: "Login successfully" })
      } else {
        res.status(401).json({ message: "Unauthorised access" })
      }

    }
  }
  catch {
    res.status(200).send('Internal server error')
  }
})
auth.get('/logout',(req,res)=>{
  res.clearCookie('userToken')
  res.status(200).json({message:'Logout successfully'})
})

export default auth ;