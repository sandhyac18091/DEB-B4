import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import authenticate from '../Middileware/auth.js'
dotenv.config()

const adminroute=Router()
const movie=new Map()
const screen=new Map()
const moviedetails=new Map()
const secretkey=process.env.Secretkey

adminroute.post('/Signup', async (req, res) => {
    try {
        const { Firstname,Lastname,Username, Password, Userrole } = req.body
        const newp = await bcrypt.hash(Password, 10)

        if (movie.get(Username)) {
            res.status(400).send({ message: 'Username already exist' })
        } else {
            movie.set(Username, {
                Firstname,Lastname,Username, Password: newp, Userrole
            });
            res.status(201).send({ message: 'Successfully signed up' })
            console.log(movie.get(Username));

        }
    } catch {
        res.status(500).send({ message: 'Internal server error' })
    }
});
adminroute.post('/Login', async (req, res) => {
    try {
        const { Username, Password } = req.body
        const result = movie.get(Username)
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
adminroute.post('/screen',authenticate,(req,res)=>{
    const{Screenno,Noofseats}=req.body
    if(!Screenno && !Noofseats){
        res.status(201).json({message:'Screen details are required'})
    }if(screen.get(Screenno)){
        res.status(403).json({message:'Screen already exist'})
    }else{
        screen.set(Screenno,{Noofseats})
        res.status(201).json({message:'Screen added successfully'})
        console.log(screen.get(Screenno));
        
    }
});
adminroute.post('/moviedetails',authenticate,()=>{
   try{
    const{Name,Screen,Noofshows,Screenno,Seats,Rates}=req.body
    if(moviedetails.get(Name)){
        res.status(400).json({message:'Name already exist'})
    }else{
        moviedetails.set(Name,{
            Screen,Noofshows,Screenno,Seats,Rates
        })
        res.status(201).json({message:'Movie details added successfully'})
    }
   }catch{
    res.status(500).json({message:'Internal server error'})
   }
})

export default adminroute;