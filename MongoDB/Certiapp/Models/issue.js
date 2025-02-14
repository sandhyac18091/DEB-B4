import { Schema } from "mongoose";
import { model } from "mongoose";

const issue=new Schema({
    selectcourse:{type:String,required:true},
    certificateid:{type:String,required:true,unique:true},
    candidatename:{type:String,required:true},
    selectgrade:{type:String,required:true},
    issuedate:{type:Date,required:true}
})
const issuecert=new model('Certidetails',issue)
export default issuecert;