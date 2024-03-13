const mongoose=require('mongoose');
module.exports=connectDb=async()=>{
    try{
        await mongoose.connect('mongodb+srv://root:khanh@cluster0.ond7qez.mongodb.net/ntl?retryWrites=true&w=majority');
        console.log("Connect Db");
    }
    catch(error){
        console.log(error);
    }
}