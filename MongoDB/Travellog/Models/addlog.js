import { Schema } from "mongoose";
import { model } from "mongoose";

const addlog=new Schema({
    logid:{type:String,required:true,unique:true},
    logtitle:{type:String,required:true},
    location:{type:String,required:true},
    dateoftravel:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    image:{type:String}
})
const add=model('Logdetails',addlog)
export default add;