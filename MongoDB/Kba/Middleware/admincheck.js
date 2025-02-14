const adminCheck=(req,res,next)=>{
    if(req.Userrole=='Admin'){
        next();
    }
    else{
        res.status(403).json({msg:"You are not allowed"})
    }
}

export default adminCheck;