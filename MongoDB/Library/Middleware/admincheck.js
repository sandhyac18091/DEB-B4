const adminCheck=(req,res,next)=>{
    if(req.UserRole=='Admin'){
        next();
    }
    else{
        res.status(403).json({msg:"You are not allowed"})
    }
}

export default adminCheck;