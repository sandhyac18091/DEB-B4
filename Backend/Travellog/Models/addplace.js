import { Schema } from "mongoose";
import { model } from "mongoose";

const addplace=new Schema({
    PlaceId:{Type:String,required:true,unique:true},
    placeName:{Type:String,required:true},
    description:{Type:String,required:true},
    image:{Type:String,required:true},
    
})
const place=model('Placedetails',addplace)
export default place;