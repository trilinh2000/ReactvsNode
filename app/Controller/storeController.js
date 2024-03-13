const fs = require('fs');
const store=require('../model/store');
const path = require('path');
module.exports.create=async(req,res,next)=>{
    console.log(req.img)
    // const data=fs.readFileSync(path.join('app/uploads/'+req.file.filename));
    // if(data&&data.length>0){
    //     if(req.user&&req.user.id){
    
    
    //         const obj={
    //             productID:req.user.id,
    //             title:"abc",
    //             img:{
    //                 data:data,
    //                 contentType:'image/jpg'
    //             }
    //         }
    //         const storeCreate=await store.create(obj);
    //         // console.log(storeCreate)
    //         if(storeCreate){
    //             return res.status(200).json({
    //                     EM:"upload img success",
    //                     EC:0,
    //                     DT:storeCreate
    //             })
    //         }
    //         else{
    //             return {
    //                 EM:"upload img error",
    //                 EC:1,
    //                 DT:''
    //             }
    //         }
    //     }
    //     else{
    //         return {
    //             EM:"upload img error",
    //             EC:1,
    //             DT:''
    //         }
    //     }
    // }
    // else{
    //     return {
    //         EM:"upload img error",
    //         EC:1,
    //         DT:''
    //     }
    // }
}