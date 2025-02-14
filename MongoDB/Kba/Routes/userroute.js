import { Router } from "express";
import { authenticate } from "../Middleware/authmiddleware.js";
import adminCheck from "../Middleware/admincheck.js";
import sample1 from "../Model/addcourse.js";
import upload from "../Middleware/uploads1.js";
import sharp from "sharp";

const userroute = Router();

const convertToBase64 = (buffer) => {
  return buffer.toString('base64');
};


userroute.post('/addcourse', authenticate, adminCheck, upload.single("courseImage"), async (req, res) => {

  try {
    //  console.log(req.Userrole);

    const { Coursename, Courseid, Coursetype, Description, Price } = req.body
    const existinguser = await sample1.findOne({ coursename: Coursename })
    if (existinguser) {
      res.status(401).json({ message: 'Coursename already exist' })


    } else {
      let imageBase64 = null;
      if (req.file) {
        imageBase64 = convertToBase64(req.file.buffer)
      }
      // const imagePath=req.file?req.file.path: "";
      const newUser = new sample1({
        coursename: Coursename,
        courseid: Courseid,
        coursetype: Coursetype,
        description: Description,
        price: Price,
        image: imageBase64
      })
      await newUser.save()
      res.status(201).json({ message: "Successfully added course" })

    }

  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }



});
userroute.get('/getcourse/:Coursename', async (req, res) => {
  try {
    const coursename = req.params.Coursename;
    console.log(coursename);

    const coursedetails = await sample1.findOne({ coursename });

    if (coursedetails) {
      

      const imageBuffer = Buffer.from(coursedetails.image, "base64")
      const compressedImage = await sharp(imageBuffer)
        .resize({ width: 300 })
        .jpeg({ quality: 70 }) 
        .toBuffer();

      res.set({
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename=courseImage.png'
      });
     res.send(compressedImage);
    // res.send(coursedetails);
    } else {
      res.status(404).json({ message: 'No such course' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


//  userroute.get('/getcourse',(req,res)=>{
//   const name=req.query.Coursename
//   console.log(name);

//  })
userroute.put('/updatecourse', authenticate, adminCheck, async (req, res) => {

  const { Coursename, Courseid, Coursetype, Description, Price } = req.body
  const result = await sample1.findOne({ coursename: Coursename })
  if (result) {
    result.coursename = Coursename
    result.courseid = Courseid,
      result.coursetype = Coursetype,
      result.description = Description,
      result.price = Price
    await result.save()
    res.status(201).json({ message: 'Course updated successfully' })
  } else {
    res.status(403).json({ message: 'Course not found' })
  }




})
userroute.patch('/editcourse', authenticate, adminCheck, async (req, res) => {
  const { Coursename, Coursetype, Price } = req.body
  console.log(Coursetype);
  const result = await sample1.findOne({ coursename: Coursename })

  if (result) {
    result.coursename = Coursename,
      result.coursetype = Coursetype,
      result.price = Price
    await result.save()
    res.status(201).json({ message: 'Course updated successfully' })


  } else {
    res.status(403).json({ message: 'Course does not exist' })
  }


})
userroute.delete('/deletecourse/:Coursename', authenticate, adminCheck, async (req, res) => {
  try {
    const courseName = req.params.Coursename;
    console.log(courseName, 'Deleted successfully');

    const course = await sample1.findOne({ coursename: courseName });

    if (!course) {
      return res.status(404).json({ message: 'Course not available' });
    }

    await sample1.deleteOne({ coursename: courseName });
    res.status(200).json({ message: 'Course deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});




export { userroute }