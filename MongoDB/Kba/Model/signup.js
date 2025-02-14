import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";

const sign=new Schema({
    Firstname:{type:String,required:true},
    Lastname:{type:String,required:true},
    Username:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    userrole:{type:String,required:true},
});
//trim:true,lowercase:true,minlength:6,enum:['admin','user']
const sample=model('Signupdetails',sign)
export default sample;