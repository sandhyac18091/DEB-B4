import { Router } from "express";
const admin=Router()

admin.post('/signUp',(req,res)=>{
    console.log('Admin signup');
    
})
export default admin;