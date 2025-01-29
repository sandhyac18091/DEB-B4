import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const auth = Router();
const user = new Map()

const secretkey=process.env.Secretkey;
auth.get('/', (req, res) => { //callback function
  res.send('Hello world')
})


auth.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, username, password, Userrole } = req.body;




    const newp = await bcrypt.hash(password, 10);
    //  console.log(newp);


    if (username == 'sandhya123') {
      res.status(400).json({message:'Username already exist'});

    }
    else {
      user.set(username, {
        firstname, lastname, password: newp, Userrole
      });

      res.status(201).json({message:'Signup Successfully'})
      console.log(user.get(username));
    }
  } catch {
    res.status(500).send('internal server error')

  }

})
auth.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const result = user.get(username);
    if (!result) {
      console.log('enter valid username');

    } else {
      console.log(result.password);
      const compare = await bcrypt.compare(password, result.password)
      console.log(compare);
      console.log(result.Userrole);
      
      if (compare) {
        const token=jwt.sign({username:username,Userrole:result.Userrole},secretkey,{expiresIn:'1hr'})//sign function used to create token username and role is payload,using secretkey to use sign the payload, expiresin used for token validity
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

export { auth };