import { Schema } from "mongoose";
import { model } from "mongoose";

const sign=new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userrole:{type:String,required:true},
})
const register=model('Signupdetails',sign)
export default register;
