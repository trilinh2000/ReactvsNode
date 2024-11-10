const fs = require('fs');
const store=require('../model/store');
const path = require('path');
module.exports.readStore=async(req,res)=>{
    try {
        const data=await store.find({},{img:1,title:1},{new:true});
        if(data&&data.length>0){
            return res.status(200).json({
                EM:"get items success",
                EC:0,
                DT:data
            })
        }
        else{
            return res.status(403).json({
                EM:"get items error",
                EC:1,
                DT:''
            })
        }
    
    } catch (error) {
        return res.status(403).json({
            EM:"get items error",
            EC:1,
            DT:''
        })
    }
}
module.exports.create=async(req,res,next)=>{
        if(req.user&&req.user.id){
    
    
            const obj={
                productID:req.user.id,
                title:req.body.title,
                img:{
                    data:fs.readFileSync(path.join('app/uploads/'+req.file.filename)),
                    contentType:'image/jpeg'
                }
            }
            const storeCreate=await store.create(obj);
            if(storeCreate){
                return res.status(200).json({
                        EM:"upload img success",
                        EC:0,
                        DT:storeCreate
                })
            }
            else{
                return {
                    EM:"upload img error",
                    EC:1,
                    DT:''
                }
            }
        }
        else{
            return {
                EM:"upload img error",
                EC:1,
                DT:''
            }
        }
    }