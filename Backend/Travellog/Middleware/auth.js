import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

const secretkey=process.env.Secretkey;
// const secretkey='hello';

const authenticate=(req,res,next)=>{
const cookies=req.headers.cookie;
    //req.cookies
    console.log(cookies);
    const cookie=cookies.split(';')
    for(let cooki of cookie){
    const [name,token]=cooki.trim().split('=');
    if(name=='authToken'){
       const verified= jwt.verify(token,secretkey);
       console.log(verified);
       req.Email=verified.Email;
       req.UserRole=verified.UserRole;
       break;
    }
    }
    next();
}
export default authenticate;