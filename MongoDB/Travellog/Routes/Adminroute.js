import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import register from "../Models/signup.js";
import place from "../Models/addplace.js";
import authenticate from "../Middleware/auth.js";
import {adminCheck} from "../Middleware/admincheck.js";
import sharp from "sharp";
import upload from "../Middleware/uploads.js";

dotenv.config()

const Adminroute = Router()
const secretkey = process.env.Secretkey

Adminroute.post('/Signup', async (req, res) => {
    try {
        const { Firstname, Lastname, Username, Email, Password, Userrole } = req.body
        const newp = await bcrypt.hash(Password, 10)
        const sign = await register.findOne({ email: Email })
        if (sign) {

            res.status(400).json({ message: 'Email already used' })
        } else {
            const newUser = register({
                firstname: Firstname,
                lastname: Lastname,
                username: Username,
                email:Email,
                password: newp,
                userrole: Userrole
            })
            await newUser.save()
            res.status(201).json({ message: "Registered Successfully" })

        }

    } catch {
        res.status(500).json({ message: 'Internal server error' })
    }
});
Adminroute.post('/Login', async (req, res) => {
    try {
        const { Email, Password } = req.body;


        const result = await register.findOne({ email: Email });

        if (!result) {
            console.log('Enter valid email id');
            return res.status(400).json({ message: 'Enter a valid email ID' });
        } else {

            const compare = await bcrypt.compare(Password, result.password);

            console.log(compare);
            console.log(result.userrole);

            if (compare) {

                const token = jwt.sign({ Email: result.email, Userrole: result.userrole }, secretkey, { expiresIn: '1h' });

                console.log(token);
                res.cookie('authToken', token, {
                    httpOnly: true
                });

                res.status(200).json({ message: 'Login successfully' });
            } else {
                res.status(401).json({ message: 'Unauthorized access' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const convertToBase64 = (buffer) => {
    return buffer.toString('base64');
  };
  

Adminroute.post('/addplace', authenticate, adminCheck, upload.single("Placeimage"), async (req, res) => {
    try {
        const { Placeid, PlaceName, Description, Timetovisit } = req.body;
        const existingplace = await place.findOne({ placeid: Placeid });
        if (existingplace) {
            return res.status(403).json({ message: "Place already exists with this ID" });
        }

        let imageBase64 = null;
        if (req.file) {
            imageBase64 = convertToBase64(req.file.buffer);
        } else {
            console.log("No file uploaded");
        }

        const newUser = new place({
            PlaceId: Placeid,
            placeName: PlaceName,
            description: Description,
            timetovisit: Timetovisit,
            image: imageBase64,
        });

        await newUser.save();
        res.status(201).json({ message: 'Place successfully added' });

    } catch (error) {
       
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
});

Adminroute.get('/getplace/:Placeid', async (req, res) => {
    try {
        const places = req.params.Placeid;
        console.log(places);

        const placedetails = await place.findOne({ PlaceId: places }); 
        if (placedetails) {
            const imageBuffer = Buffer.from(placedetails.image, "base64");
            const compressedImage = await sharp(imageBuffer)
                .resize({ width: 300 })
                .jpeg({ quality: 70 }) 
                .toBuffer();

            res.set({
                "Content-Type": "image/png",
                "Content-Disposition": 'attachment; filename=Placeimage.png'
            });
            res.send(compressedImage);
        } else {
            res.status(404).json({ message: 'No such place' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
Adminroute.get('/logout',(req,res)=>{
    res.clearCookie('authToken')
    res.status(200).json({message:'Logout successfully'})
  })

export default Adminroute;