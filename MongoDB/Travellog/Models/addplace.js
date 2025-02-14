import { Schema } from "mongoose";
import { model } from "mongoose";

const addplace=new Schema({
    PlaceId:{type:String,required:true,unique:true},
    placeName:{type:String,required:true},
    description:{type:String,required:true},
    timetovisit:{type:String,required:true},
    image:{type:String},
    
})
const place=model('Placedetails',addplace)
export default place;