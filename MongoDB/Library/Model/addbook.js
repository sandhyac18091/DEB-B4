import { Schema } from "mongoose";
import { model } from "mongoose";

const addbook=new Schema({
    bookname:{type:String,required:true},
    booktype:{type:String,required:true},
    description:{type:String,required:true},
    uploadbook:{type:String,required:true},
    price:{type:String,required:true}
})
const book=model('AddDetails',addbook)
export default book;