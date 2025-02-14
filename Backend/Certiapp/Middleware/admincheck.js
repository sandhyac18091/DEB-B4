const adminCheck=(req,res,next)=>{
    if(req.userrole=='Admin'){
        next();
    }
    else{
        res.status(403).json({Message:"You are not allowed"})
    }
}

export default adminCheck;