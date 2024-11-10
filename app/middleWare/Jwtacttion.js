let jwt = require('jsonwebtoken');
require('dotenv/config');
const nonSecurePaths=['/','/login','/register','/logout','/point','/store/read','/account']

const createJWT=(payload)=>{
    let token=null;
    try {
        token = jwt.sign(payload, process.env.JWT_Secret);
        return token;
    } catch (error) {
        return res.status(403).json({
            EC:-1,
            DT:'',
            EM:"not authenticated a user"
        }) 
    }
}
const verifyToken=(token)=>{
    try {
        let decoded=jwt.verify(token,process.env.JWT_Secret,function(err,result){
            if(err){
                return null;
            }
            else{
                return result;
            }
        });
        if(decoded)
        return decoded;
    } catch (error) {
        return res.status(403).json({
            EC:-1,
            DT:'',
            EM:"not authenticated a user"
        })
    }
    
}
const extractToken=(req)=>{
    if(req.headers.authorization&&req.headers.authorization.split(' ')[0]==='Bearer'){
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
const checkUserJWT=(req,res,next)=>{
    try {
        if(nonSecurePaths.includes(req.path)) return next();
        let cookie=req.cookies;
        let tokenFormHeader=extractToken(req);
    if((cookie&&cookie.jwt)||tokenFormHeader){
        let token=cookie&&cookie.jwt?cookie.jwt:tokenFormHeader;
        let decoded=verifyToken(token);
        if(decoded){
            req.user=decoded;
            req.token=token;
            next();
        }
        else{
            return res.status(401).json({
                EC:-1,
                DT:'',
                EM:"not authenticated a user"
            })
        }
    }
    else{
        return res.status(401).json({
            EC:-1,
            DT:'',
            EM:"not authenticated a user"
        })
    }
    } catch (error) {
        return res.status(401).json({
            EC:-1,
            DT:'',
            EM:"not authenticated a user"
        })
    }
}
const checkUserPermission=(req,res,next)=>{
    if(nonSecurePaths.includes(req.path)||req.path==='/account'||req.path==='/store/read') return next();
    if(req.user){
        let group=req.user.group;
        if(group=="Leader"||group=='Project Manager'){
            next();
        }
        else{
            return res.status(403).json({
                EC:-1,
                DT:'',
                EM:"not authenticated a user"
            })
        }
    }
    else{
        return res.status(403).json({
            EC:-1,
            DT:'',
            EM:"not authenticated a user"
        })
    }
}
module.exports={createJWT,verifyToken,checkUserJWT,checkUserPermission};