import { Router } from "express";
const auth=Router();
auth.get('/',(req,res)=>{ //callback function
    res.send('Hello world')
})
export{auth};