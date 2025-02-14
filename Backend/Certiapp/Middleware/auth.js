import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

const secretkey=process.env.Secretkey;


const authenticate=(req,res,next)=>{
const cookies=req.headers.cookie;
    
    console.log(cookies);
    const cookie=cookies.split(';')
    for(let cooki of cookie){
    const [name,token]=cooki.trim().split('=');
    if(name=='certiappToken'){
       const verified= jwt.verify(token,secretkey);
       console.log(verified);
       req.username=verified.Username
       req.userrole=verified.Userrole;
       break;
    }
    }
    next();
}
export  {authenticate};