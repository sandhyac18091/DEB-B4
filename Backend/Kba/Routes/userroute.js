import { Router } from "express";
import { authenticate } from "../Middleware/authmiddleware.js";
import adminCheck from "../Middleware/admincheck.js";

const userroute=Router();
const course=new Map()

userroute.post('/addcourse',authenticate,(req,res)=>{

    try{
     console.log(req.Userrole);
     
       const{Coursename,Courseid,Coursetype,Description,Price}=req.body
       if(course.get(Coursename)){
         res.status(401).json({message:'Coursename already exist'})
        
       
         }else{
           course.set(Coursename,{Courseid,Coursetype,Description,Price});
             res.status(201).json({message:"Successfully added course"})
             console.log(course.get(Coursename));
         }
     
    }catch{
     res.status(500).json({message:'Internal server error'})
    }
     
    
     
   });
   userroute.get('/getcourse/:Coursename',(req,res)=>{
    const coursename=req.params.Coursename
    console.log(coursename);
    if(course.get(coursename)){
      console.log(course.get(coursename))
      
    }else{
      res.status(400).json({message:'Course not available'})
     
        
    }
    
   })
  //  userroute.get('/getcourse',(req,res)=>{
  //   const name=req.query.Coursename
  //   console.log(name);
    
  //  })
  userroute.put('/updatecourse',authenticate,(req,res)=>{
    if(req.Userrole=='Admin'){
      const{Coursename,Courseid,Coursetype,Description,Price}=req.body
      if(course.get(Coursename))
      course.set(Coursename,{Courseid,Coursetype,Description,Price})
      res.status(201).json({message:'Course updated successfully'})
    }else{
      res.status(403).json('Course does not exist')
    }
      
    
  })
  userroute.patch('/editcourse',authenticate,(req,res)=>{
      const{Coursename,Coursetype,Price}=req.body
      console.log(Coursetype);
      const result=course.get(Coursename)
      console.log(result);
      if(result){
        course.set(Coursename,{Courseid:result.Courseid,Coursetype,Description:result.Description,Price})
        res.status(201).json({message:'Course updated successfully'})
        console.log(course.get(Coursename));
        
      }else{
        res.status(403).json({message:'Course does not exist'})
      }
    
      
  })
  userroute.delete('/deletecourse/:Coursename',authenticate,adminCheck, (req, res) => {
    const courseName = req.params.Coursename;
    console.log(courseName,'Deleted successfully');

    if (course.get(courseName)) {  
        course.delete(courseName); 
        res.status(200).json({ message: 'Course deleted successfully' });
    } else {
        res.status(404).json({ message: 'Course not available' });
    }
});
    
    

   export{userroute}