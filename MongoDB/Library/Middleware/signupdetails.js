import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userrole: { type: String, enum: ["Admin", "User"], required: true }
}, { timestamps: true });

const Admin = mongoose.model("Signupdetails", userSchema);

export default Admin;
