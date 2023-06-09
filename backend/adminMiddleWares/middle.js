let jsonWebToken=require('jsonwebtoken')
const { accessSecret } = require('../tokens');

let verifyAuth=(req,res,next)=>{
    console.log('hittind')
    const authHeader=req.headers['authorization'];
    let token=authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token==null){
       return  res.redirect('/error')
    }
    jsonWebToken.verify(token,accessSecret,(err,user)=>{
        if(err)
        {
            return res.redirect('/error');
        }
        req.user=user
        next()
    })
}
let isSuperAdmin=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    let token=authHeader && authHeader.split(' ')[1];
    if(token==null){
       return  res.redirect('/error')
    }
    jsonWebToken.verify(token,accessSecret,(err,user)=>{
        console.log(user)
        if(err)
        {
            return res.redirect('/error');
        }
        if(user.userExist.role!='admin')
        {
            return res.status(403).json({
                err:'sale admin nahi hai tu'
            })
        }
        next();
    })
}

module.exports={verifyAuth,isSuperAdmin}