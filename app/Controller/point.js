const modelPoint=require('../model/modelPoint')
module.exports.point=async(req,res)=>{
    const point=await modelPoint.find({},{x:1,y:1});
    return res.status(200).json({
        EM:'add point success',
        EC:0,
        DT:point
    })
    
}

module.exports.add=async(req,res,next)=>{
    const {x1,y1}=req.body;
    const {x2,y2}=req.body;
    const x=[Number(x1),Number(x2)];
    const y=[Number(y1),Number(y2)];
    if(x&&y){
        const addPoint=await modelPoint.create({x:x,y:y});
        return res.status(200).json({
            EM:'add point success',
            EC:0,
            DT:addPoint
        })
    }
    
} 