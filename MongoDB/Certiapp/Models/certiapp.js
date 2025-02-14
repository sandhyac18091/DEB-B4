import { Schema } from "mongoose";
import { model } from "mongoose";
const certi=new Schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userrole:{type:String,required:true},
    
});
const certidapp=model('Userdetails',certi)

export default certidapp;