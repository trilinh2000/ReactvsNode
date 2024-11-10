const mongoose=require('mongoose');
const point=new mongoose.Schema({
    x:{
        type:Array,
        require:true
    },
    y:{
        type:Array,
        require:true
    }
},{
    collection:"point",
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("point",point);