const accountModel=require('../model/accountModel');
require('dotenv/config');
const {createJWT}=require('../middleWare/Jwtacttion');
const bcrypt=require('bcrypt');
const checkEmail=async(email)=>{
    let user=await accountModel.findOne({email:email},{new:true});
    // console.log("check email:",user);
    if(user){
        return true;
    }
    return false;

}
const checkPhone=async(phone)=>{
    let user=await accountModel.findOne({phone:phone},{new:true});
    // console.log("check phone:",user);
    if(user){
        return true;
    }
    return false;

}
const checkPassword=(password,hashedPassword)=>{
    return bcrypt.compareSync(password,hashedPassword);

}
const register=async(data)=>{
    try {
        let isEmail=await checkEmail(data.email);
        let isPhone=await checkPhone(data.phone);
        if(isEmail===true){
            return {
                EM:"The email is already exits",
                EC:1
            }
        }
       
        else if(isPhone===true){
            return {
                EM:"The phone is already exits",
                EC:1
            }
        }
        else{
            bcrypt.hash(data.password,parseInt(process.env.BCRYPT_HASH)).then(async(hashed)=>{
                await accountModel.create({username:data.username,email:data.email,password:hashed,phone:data.phone,group:data.group});
                })
            return {
                    EM:`A user ${data.username} is created successfully! `,
                    EC:0
                }
        }
    } catch (error) {
        return {
            EM:"some thing wrong is exits...",
            EC:-1,
        }
    }
};
const handleLogin=async(body)=>{
   try {
        let user=await accountModel.findOne({email:body.email});
        if(user){
            let isCorrect=await checkPassword(body.password,user.password);
            if(isCorrect===true){
                let payload={
                    id:user._id,
                    email:user.email,
                    username:user.username,
                    group:user.group,
                    expiresIn:process.env.JWT_ExpiresIn
                }
                // console.log(">>>>",payload)
                let token=createJWT(payload);
                return {
                    EM:`A ${user.username} is login successfully! `,
                    EC:0,
                    DT:{
                        token:token,
                        id:user._id,
                        email:user.email,
                        username:user.username,
                        group:user.group
                    },
                }
            }
            else{
                return{
                    EM:"Your Email/ or password is incorrect! ",
                    EC:1,
                    DT:"",
                }
            }
        }
        else{
            return{
                EM:"Your Email/ or password is incorrect! ",
                EC:1,
                DT:"",
            }
        }
   } catch (error) {
        return{
            EM:"NOT connect server",
            EC:1,
            DT:"",
        }
   }
}
module.exports={
    register,handleLogin
}