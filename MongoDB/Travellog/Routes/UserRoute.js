import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import {userCheck} from "../Middleware/admincheck.js"
import add from '../Models/addlog.js'
import Profile from "../Models/addprofile.js";
import upload from "../Middleware/uploads.js";
import sharp from "sharp";

const UserRoute=Router()

const convertToBase64 = (buffer) => {
    return buffer.toString('base64');
};

UserRoute.post('/addlog',authenticate,userCheck,upload.single("logImage"),async(req,res)=>{
    try{
        const{Logid,Logtitle,Location,Dateoftravel,Description,Rating}=req.body
        const existinglog=await add.findOne({logid:Logid})
    if(existinglog){
        res.status(403).json({message:"Already exist this logid"})
    }else{
        let imageBase64 = null;
      if (req.file) {
        imageBase64 = convertToBase64(req.file.buffer)
      }
        const newUser=new add({
            logid:Logid,
            logtitle:Logtitle,
            location:Location,
            dateoftravel:Dateoftravel,
            description:Description,
            rating:Rating,
            image:imageBase64
        })
        await newUser.save();
        res.status(201).json({message:'log Successfully added'})
        
        
    }
    }catch{
        console.log(error);
        res.status(500).json({message:'Internal Server error'})
        
    }
})
UserRoute.get('/getlog/:Location',async(req,res)=>{
    try{
    const location=req.params.Location
    console.log(location)
    const getlog=await add.findOne({location})
    if(getlog){
        const imageBuffer = Buffer.from(getlog.image, "base64")
      const compressedImage = await sharp(imageBuffer)
        .resize({ width: 300 })
        .jpeg({ quality: 70 }) 
        .toBuffer();

      res.set({
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename=logImage.png'
      });
      res.send(compressedImage);
    // res.send(getlog);
        
    }else{
        res.status(400).json({message:'Log not found'})
    }

    }catch (error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

UserRoute.patch('/editlog', authenticate, userCheck, upload.single("logImage"), async (req, res) => {
    const { Logid, Dateoftravel, Description,imageBase64 } = req.body;
    
    try {

        
        const result = await add.findOne({ logid: Logid });
        if (!result) {
            return res.status(404).json({ message: 'Log not found' });
        }

        
        result.dateoftravel = Dateoftravel;
        result.description = Description;
        result.image=imageBase64;
        
        if (req.file) {
            result.image = convertToBase64(req.file.buffer);
        }

        await result.save();
        res.status(200).json({ message: 'Log updated successfully',});
    } catch (error) {
        console.error("Error during log update:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


UserRoute.delete('/deletelog/:Logid',authenticate,userCheck,async(req,res)=>{
    try{
        const logId=req.params.Logid
        console.log(logId,'Deleted successfully');
        const log=await add.findOneAndDelete({logid:logId})
        if(!log){
            res.status(404).json({message:'Log not available'})
        }else{
        res.status(200).json({ message: 'Log deleted successfully' });
        }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
    
})
UserRoute.post('addprofile',authenticate,userCheck,async(req,res)=>{
    try{
        
    }catch (error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})
UserRoute.post('/addProfile', authenticate, userCheck, async (req, res) => {
    const { Username,Name,Email,Phone,Bio } = req.body;

    try {
       
        const existingProfile = await Profile.findOne({ username: Username });

        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists' });
        }

       
        const newProfile = new Profile({
            username:Username,
            name:Name,
            email:Email,
            phone:Phone,
            bio:Bio
        });

        await newProfile.save();
        res.status(201).json({ message: 'Profile added successfully', profile: newProfile });

    } catch (error) {
        console.error('Error adding profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
UserRoute.get('/getProfile/:Username', authenticate, userCheck, async (req, res) => {
    try {
        const {Username} = req.params; 
        
        const profile = await Profile.findOne({ username: Username });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({message: 'Profile retrieved successfully', profile });

    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

UserRoute.get('/logout',(req,res)=>{
    res.clearCookie('authToken')
    res.status(200).json({message:'Logout successfully'})
  })


export default UserRoute;