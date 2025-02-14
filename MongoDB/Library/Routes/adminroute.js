import { Router } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Admin from "../Middleware/signupdetails.js";
import authenticate from '../Middleware/auth.js'
import book from "../Model/addbook.js";

dotenv.config()
const adminroute = Router();

const secretkey = process.env.Secretkey;

adminroute.post('/Signup', async (req, res) => {
    try {
        const { Fullname, Username, Email, Password, Userrole } = req.body
        const newp = await bcrypt.hash(Password, 10)
        const signup=await Admin.findOne({username:Username})
        if (signup) {
            res.status(400).send({ message: 'Username already exist' })
        } else {
            const newUser=Admin ({
                fullname:Fullname, 
                username:Username,
                email:Email, 
                password: newp, 
                userrole:Userrole
            });
            await newUser.save()
            res.status(201).send({ message: 'Successfully signed up' })
            

        }
    } catch {
        res.status(500).send({ message: 'Internal server error' })
    }
});
adminroute.post('/Login', async (req, res) => {
    try {
        const { Username, Password } = req.body
        const result = await Admin.findOne({username:Username})
        if (!result) {
            console.log('Enter valid username');

        } else {
            const compare = await bcrypt.compare(Password, result.password)
            console.log(compare);
            console.log(result.userrole);
            if (compare) {
                const token = jwt.sign({ Username: Username, Userrole: result.userrole }, secretkey, { expiresIn: '1hr' })
                console.log(token);
                res.cookie('userToken', token, {
                    httpOnly: true
                })
                res.status(200).json({ message: 'Login successfully' })
            } else {
                res.status(401).json({ message: 'Unauthorised access' })
            }

        }
    } catch {
        res.status(500).send({ message: 'Internal server error' })
    }
})
const convertToBase64 = (buffer) => {
    return buffer.toString('base64');
  };
adminroute.post('/addbook', authenticate,adminCheck,upload.single('bookImage'),async (req, res) => {
    try {
        const { Bookname, Booktype, Description, Price } = req.body
        const existingbook=await book.findOne({bookname:Bookname})
        if (existingbook) {
            res.status(400).json({ msg:"Bookname already exist" });
        }
        else {
            let imageBase64 = null;
      if (req.file) {
        imageBase64 = convertToBase64(req.file.buffer)
      }
            const newUser=new book({
                bookname:Bookname,
                booktype:Booktype,
                description:Description,
                uploadbook:imageBase64,
                price:Price
            })
            await newUser.save();
            res.status(201).json({ message:'Book added Successfully' })
            
            
        }
    } catch {
        res.status.json({ message: 'Internal server error' })
    }
})

adminroute.get('/getbook/:Bookname',async(req,res)=>{
  try{
    const books=req.params.Bookname
  console.log(books);
  const bookdetails=await book.findOne({bookname:Bookname})
  if(bookdetails){
    const imageBuffer = Buffer.from(bookdetails.image, "base64")
      const compressedImage = await sharp(imageBuffer)
        .resize({ width: 300 })
        .jpeg({ quality: 70 }) 
        .toBuffer();

      res.set({
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename=bookImage.png'
      });
     res.send(compressedImage);
    // res.send(bookdetails);
    } else {
      res.status(404).json({ message: 'No such course' })
    }
  }

 catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

adminroute.patch('/editbook',authenticate,adminCheck,async(req,res)=>{
    const{Bookname,Booktype,Price}=req.body
    console.log(Booktype);
    const result=await book.findOne({bookname:Bookname})
    
    if(result){
        result.bookname=Bookname
        result.booktype=Booktype
        result.price=Price
        await result.save()
        res.status(200).json({message:'Book updated successfully'})
    }else{
        res.status(404).json({message:'Book not available'})
    }
    
    
});
adminroute.delete('/deletebook/:Bookname',authenticate,adminCheck,async(req,res)=>{
    try{
        const bookname=req.params.Bookname
    console.log(bookname,'Deleted successfully');
    const books=await book.findOne({bookname:bookname})
    if(!books){
        res.status(404).json({message:'Book not available'})
    }else{
        await book.deleteOne({bookname:bookname})
        res.status(200).json({message:'Book deleted successfully'})
    }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
})


export { adminroute }