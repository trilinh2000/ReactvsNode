const userService=require('../service/userService');
const getUserAccount=async(req,res)=>{
    if(req.user){
        return res.status(200).json({
            EM:"oki",
            EC:0,
            DT:{
                    
                    id:req.user.id,
                    email:req.user.email,
                    username:req.user.username,
                    group:req.user.group,
                    token:req.token,
            }
        })
    }
    return res.status(200).json({
        EM:'not found',
        EC:1,
        DT:''
    })
     
    
}
const readFunc=async(req,res)=>{
    try {
        // console.log(req.user);
        // console.log("check cookie>>",req.cookies);
        if(req.user&&req.cookies){
            if(req.query.page&&req.query.limit){
                let page=req.query.page;
                let limit=req.query.limit;
                let data=await userService.getUser(+page,+limit);
                // console.log(data.DT);
                return res.status(200).json({
                    EM:data.EM,
                    EC:data.EC,
                    DT:data.DT
                })
            }
            else{
                let data=await userService.getAllUser();
                return res.status(200).json({
                    EM:data.EM,
                    EC:data.EC,
                    DT:data.DT
                })
            }
        }
        else{
            return res.status(500).json({
                EM:"some thing wrong is exits...",
                EC:-1,
                DT:''
            }) 
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM:"some thing wrong is exits...",
            EC:-1,
            DT:''
        })
    }
}
const createFunc=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM:"some thing wrong is exits...",
            EC:-1,
            DT:''
        })
    }
}
const updateFunc=async(req,res)=>{
    try {
        if(req.body){
            let data=await userService.updateUser(req.body);
            if(data){
                return res.status(200).json({
                    EM:data.EM,
                    EC:data.EC,
                    DT:data.DT
                })
            }
            else{
                return res.status(500).json({
                    EM:"Error edit user",
                    EC:-1,
                    DT:[]
                })
            }
        }
        else{
            return res.status(500).json({
                EM:"Error edit user",
                EC:-1,
                DT:[]
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            EM:"Error edit user",
            EC:-1,
            DT:[]
        })
    }
}
const deleteFunc=async(req,res)=>{
    try {
        const id=req.body.id;
        // console.log(id);
        let data=await userService.deleteUser(id);
        if(data){
            return res.status(200).json({
                EM:data.EM,
                EC:data.EC,
                DT:data.DT
            })
        }
        else{
            return res.status(500).json({
                EM:"Error delete user",
                EC:-1,
                DT:[]
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM:"Error delete user",
            EC:-1,
            DT:[]
        })
    }
}
module.exports={
    readFunc,createFunc,updateFunc,deleteFunc,getUserAccount
}