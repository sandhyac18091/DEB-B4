import { Schema } from "mongoose";
import { model } from "mongoose";

const addProfile = new Schema({
    
    username:{type: String,required: true,unique: true},
    email:{type: String,required: true, },
    phone:{type: String},
    address:{type: String},  
    bio:{type: String},  
    createdAt:{type: Date, default: Date.now},
});

const Profile = model('Profile', addProfile);
export default Profile;
