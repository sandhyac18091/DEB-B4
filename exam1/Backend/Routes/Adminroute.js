import { Router } from "express";
import student from "../Model/adddetails.js";

const Adminroute=Router()

Adminroute.post('/addstudent',async(req,res)=>{
    try{
        const{StudentName, EnrollmentNumber,Course,DateofEnrollment}=req.body
    const existingstudent=await student.findOne({enrollmentNo:EnrollmentNumber})
    if(existingstudent){
        res.status(403).json({message:'Already exist'})
    }else{
        const newUser=student({
            studentName:StudentName,
            enrollmentNo:EnrollmentNumber,
            course:Course,
            dateofEnrollmen:DateofEnrollment
        })
        await newUser.save()
        res.status(201).json({message:'Student details added successfully'})
    }
    }catch{
        res.status(500).json({message:'Internal server error'})
    }
})
Adminroute.get('/getcourse/:Course',async (req, res) => {
    try {
        const coursename = req.params.Course;
        const result = await student.find({ course:coursename });

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        
        res.status(500).json({ message: 'Internal server error' });
    }
});

Adminroute.put('/update', async (req, res) => {

    const{StudentName, EnrollmentNumber,Course,DateofEnrollment}=req.body
    const result = await student.findOne({ studentName:StudentName  })
    if (result) {
      result.studentName = StudentName
      result.enrollmentNumber = EnrollmentNumber,
      result.course = Course,
      result.dateofEnrollment = DateofEnrollment,
       
      await result.save()
      res.status(201).json({ message: 'student details updated successfully' })
    } else {
      res.status(403).json({ message: 'Student not found' })
    }
})

Adminroute.delete('/delete/:EnrollmentNumber', async (req, res) => {
    try {
        const record= req.params.EnrollmentNumber;
        console.log(record);

        const del = await student.findOneAndDelete({ enrollmentNo: record });

        if (!del) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student record deleted successfully", });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default Adminroute;