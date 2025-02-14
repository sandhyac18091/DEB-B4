import { Schema } from "mongoose";
import { model } from "mongoose";

const sign=new Schema({
    firstname:{Type:String,required:true},
    fastname:{Type:String,required:true},
    username:{Type:String,required:true},
    email:{Type:String,required:true,unique:true},
    password:{Type:String,required:true},
    userrole:{Type:String,required:true},
})
const register=model('Signupdetails',sign)
export default register;
