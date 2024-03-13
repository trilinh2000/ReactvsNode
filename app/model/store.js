const mongoose=require('mongoose');
const store=new mongoose.Schema({
    productID:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"account"
    },
    title:{
        type:String,
    },
    img:{
        data: Buffer,
        contentType: String
    },
    avatar:{
        type:Boolean,
        default:false
    }
},{
    collection:"store",
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("store",store)