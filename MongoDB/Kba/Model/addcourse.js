import { Schema } from "mongoose";
import { model } from "mongoose";

const add=new Schema({
    coursename:{type:String,required:true,unique:true},
    courseid:{type:String,required:true},
    coursetype:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String}
})
const sample1=model('AddDetails',add)
export default sample1;