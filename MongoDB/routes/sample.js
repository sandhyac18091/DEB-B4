import { Router } from "express";
import dotenv from 'dotenv';
import sample from '../Model/sample.js'

dotenv.config();
const auth = Router();



auth.post('/create', async (req, res) => {
  try {
    const data = req.body;

    const result=await sample.create(data)
    res.status(201).json(result);

  } catch (error) {
   
    
    res.status(500).send('internal server error')

  }

})
auth.get('/read',async(req,res)=>{
  try{
    const result=await sample.findById("67a3208574a2a901dffcf5b7");
    res.status(200).json(result)
  }catch{
    res.status(400).json({message:'Invalid'})
  }
})
export default auth