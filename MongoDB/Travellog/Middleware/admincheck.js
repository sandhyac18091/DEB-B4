const adminCheck=(req,res,next)=>{
    if(req.Userrole=='Admin'){
        next();
    }
    else{
        res.status(403).json({msg:"You are not allowed"})
    }
}

const userCheck = (req, res, next) => {
    if (req.Userrole == 'User') {
        next();
    } else {
        res.status(403).json({ msg: "You are not allowed" });
    }
};

export{userCheck,adminCheck}
