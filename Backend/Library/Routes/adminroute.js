import { Router } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import authenticate from '../Middleware/auth.js'
import adminCheck from "../Middleware/admincheck.js";

dotenv.config()
const adminroute = Router();
const library = new Map()
const book = new Map()
const secretkey = process.env.Secretkey;

adminroute.post('/Signup', async (req, res) => {
    try {
        const { Fullname, Username, Email, Password, Userrole } = req.body
        const newp = await bcrypt.hash(Password, 10)

        if (library.get(Username)) {
            res.status(400).send({ message: 'Username already exist' })
        } else {
            library.set(Username, {
                Fullname, Email, Password: newp, Userrole
            });
            res.status(201).send({ message: 'Successfully signed up' })
            console.log(library.get(Username));

        }
    } catch {
        res.status(500).send({ message: 'Internal server error' })
    }
});
adminroute.post('/Login', async (req, res) => {
    try {
        const { Username, Password } = req.body
        const result = library.get(Username)
        if (!result) {
            console.log('Enter valid username');

        } else {
            const compare = await bcrypt.compare(Password, result.Password)
            console.log(compare);
            console.log(result.Userrole);
            if (compare) {
                const token = jwt.sign({ Username: Username, Userrole: result.Userrole }, secretkey, { expiresIn: '1hr' })
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
adminroute.post('/addbook', authenticate,adminCheck, (req, res) => {
    try {
        const { Bookname, Booktype, Description, Uploadbook, Price } = req.body
        if (book.get(Bookname)) {
            res.status(400).json({ msg:"Bookname already exist" });
        }
        else {
            book.set(Bookname, { Booktype, Description, Uploadbook, Price });
            res.status(201).json({ message:'Book added Successfully' })
            console.log(book.get(Bookname));
            
        }
    } catch {
        res.status.json({ message: 'Internal server error' })
    }
})

adminroute.get('/getbook/:Bookname',(req,res)=>{
  const books=req.params.Bookname
  console.log(books);
  
  if(book.get(books)){
    console.log(book.get(books));
    
  }else{
    res.status(403).json({message:'Book not available'})
  }

})
adminroute.patch('/updatebook',authenticate,(req,res)=>{
    const{Bookname,Booktype,Price}=req.body
    console.log(Booktype);
    const result=book.get(Bookname)
    console.log(result);
    if(result){
        book.set(Bookname,{Booktype,Description:result.Description,Price,Uploadbook:result.Uploadbook})
        res.status(200).json({message:'Book updated successfully'})
    }else{
        res.status(404).json({message:'Book not available'})
    }
    
    
});
adminroute.delete('/deletebook/:Bookname',authenticate,adminCheck,(req,res)=>{
    const bookname=req.params.Bookname
    console.log(bookname,'Deleted successfully');
    if(book.get(bookname)){
        book.delete(bookname)
        res.status(200).json({message:'Book deleted successfully'})
    }else{
        res.status(404).json({message:'Book not available'})
    }
    
})

export { adminroute }