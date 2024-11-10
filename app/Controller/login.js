const accountModel=require('../model/accountModel');
const bcrypt=require('bcrypt');
let register=require("../service/Register")
require('dotenv/config')


module.exports.login=async(req,res)=>{
                try {
                    setTimeout(async()=>{
                        try {
                            if(!req.body.email&&!req.body.password){
                                return res.status(500).json({
                                    EM:"Missing required parameters",
                                    EC:1,
                                    DT:''
                                })
                            }
                            if(req.body.password&&req.body.password.length<4){
                                return res.status(500).json({
                                    EM:"Your password must have more than three",
                                    EC:1,
                                    DT:''
                                })
                            }
                            let data=await register.handleLogin(req.body);
                            res.cookie("jwt",data.DT.token,{httpOnly:true,maxAge:process.env.maxAge})
                            // port.write('login\n');
                            return res.status(200).json({
                                EM:data.EM,
                                EC:data.EC,
                                DT:data.DT,
                            })
                        } catch (error) {
                            return res.status(500).json({
                                EM:"NOT connect server",
                                EC:1,
                                DT:''
                            })
                        }
                    },1000)
                } catch (error) {
                    return res.status(500).json({
                        EM:"NOT connect server",
                        EC:1,
                        DT:''
                    })
                }
}
module.exports.create=async(req,res)=>{
    try {
        console.log(req.body);
        if(!req.body.email||!req.body.phone||!req.body.password){
            return res.status(500).json({
                EM:"Missing required parameters",
                EC:1,
                DT:''
            })
        }
        if(req.body.password&&req.body.password.length<4){
            return res.status(500).json({
                EM:"Your password must have more than three",
                EC:1,
                DT:''
            })
        }
        console.log(req.body);
        let data=await register.register(req.body,{new:true});  
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:"",
        })
    } catch (error) {   
        return res.status(500).json({
            EM:"some thing wrong is exits...",
            EC:-1,
        })
    }

    
    
}
module.exports.logout=async(req,res)=>{
    try {
        res.clearCookie('jwt');
        return res.status(200).json({
            EM:'Logout success',
            EC:0,
            DT:''
        })
    } catch (error) {
        return res.status(200).json({
            EM:'Error from data',
            EC:1,
            DT:''
        })
    }
}
module.exports.update=async(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    const updateAccounts=await accountModel.findByIdAndUpdate(id,body,{new:true});// new true tra ve ban ghi moi cho updateAccount
    return res.status(200).json(updateAccounts);
}
module.exports.delete=async(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    const updateAccounts=await accountModel.findByIdAndDelete(id,{new:true});// new true tra ve ban ghi moi cho updateAccount
    return res.status(200).json(updateAccounts);
}