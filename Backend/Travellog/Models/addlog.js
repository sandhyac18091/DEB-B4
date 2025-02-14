import { Schema } from "mongoose";
import { model } from "mongoose";

const addlog=new Schema({
    logid:{Type:String,required:true,unique:true},
    logtitle:{Type:String,required:true},
    location:{Type:String,required:true},
    dateoftravel:{Type:String,required:true},
    description:{Type:String,required:true},
    rating:{Type:String,required:true},
})
const add=model('Log details',addlog)
export default add;