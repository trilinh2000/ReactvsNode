const accountModel=require('../model/accountModel');
const getAllUser=async()=>{
    try {
        let users=await accountModel.find({},{username:1,email:1,phone:1},{new:true});
        // console.log(users)
        if(users){
            return {
                EM:"get successfully",
                EC:0,
                DT:users,
            }
        }
        else{
            return {
                EM:"get successfully",
                EC:0,
                DT:[],
            }
        }
        
    } catch (error) {
        // console.log(error)
        return {
            EM:"some thing wrong is exits...",
            EC:-1,
            DT:''
        }
    }
}
const getUser=async(page,limit)=>{
    try {
        let offset=(page-1)*limit;
        const row =await accountModel.find({},{username:1,email:1,phone:1,group:1},{new:true}).skip(offset).limit(limit);
        const count=await accountModel.find().count();
        // console.log(row)
        let totalPages=Math.ceil(+count/limit);
        let data={
            totalRows:count,
            totalPage:totalPages,
            users:row
        }
        // console.log(data)
        return{
            EM:"get successfully",
            EC:0,
            DT:data,
        }
    } catch (error) {
        return{
            EM:"get error",
            EC:1,
            DT:'',
        }
    }
}
const createUser=async(data)=>{
    try {
        let user=await accountModel.create(data);
        if(user){
            return {
                EM:"create success",
                EC:0,
                DT:user,
            }
        }
        else{
            return {
                EM:"create error",
                EC:-1,
                DT:'',
            }
        }
    } catch (error) {
        // console.log(error)
        return {
            EM:"some thing wrong is exits...",
            EC:-1,
            DT:''
        }
    }
}
const updateUser=async(data)=>{
    try {
        let user=await accountModel.findByIdAndUpdate(data._id,data,{new:true});
        if(user){
            return {
                EM:"update success",
                EC:0,
                DT:user,
            }
        }
        else {
            return {
                EM:"update error",
                EC:-1,
                DT:'',
            }
        }
    } catch (error) {
        return {
            EM:"update error",
            EC:-1,
            DT:'',
        }
    }
}
const deleteUser=async(id)=>{
    try {
        let user=await accountModel.findByIdAndDelete(id,{new:true})
        if(user){
            return {
                EM:"delete success",
                EC:0,
                DT:user,
            }
        }
        else{
            return {
                EM:"delete error",
                EC:0,
                DT:[],
            }
        }

    } catch (error) {
        return {
                EM:"delete error",
                EC:0,
                DT:[],
            }
    }
}
module.exports={
    getAllUser,createUser,updateUser,deleteUser,getUser
}