import { model } from "mongoose";
import { Schema } from "mongoose";

const add=new Schema({
    studentName:{type:String,required:true,unique:true},
    enrollmentNo:{type:String,required:true},
    course:{type:String,required:true},
    dateofEnrollmen:{type:String,required:true}
    
})
const student=new model('Adddetails',add)
export default student;