import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

const secretkey=process.env.Secretkey;
// const secretkey='hello';

const authenticate=(req,res,next)=>{
const cookies=req.headers.cookie;

    const cookie=cookies.split(';')
    for(let cooki of cookie){
    const [name,token]=cooki.trim().split('=');
    if(name=='userToken'){
       const verified= jwt.verify(token,secretkey);
       console.log(verified);
       req.UserName=verified.UserName;
       req.Userrole=verified.Userrole;
       break;
    }
    }
    next();
}
export {authenticate};