const mongoose=require('mongoose');
const account=new mongoose.Schema({
    username:{
        type:String,
        required:true,//k dc null
        unique:true,//k dc trung
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    group:{
        type:String,
        default:"",
    }

},{
    collection:"account",
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("account",account)