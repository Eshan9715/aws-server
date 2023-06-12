import Member from "../models/Member.js";


export const getMember = async(req,res)=>{
    const uid = req.params.id
    let member;
    try{
        if(uid.match(/^[0-9a-fA-F]{24}$/)) {
        member = await Member.findById(uid)
        }
    } catch(err){
        res.status(500).json(err);
    }
    if(!member){
        return res.status(404).json({message:"No member found!"})
    }
    return res.status(200).json({member})

}

export const getAllMembers = async (req,res,next)=>{
    const newMem = req.query.new;
    const role = req.query.role;
    const type = req.query.type;

    let member;
    try{
        if(newMem){
            member = await Member.find().sort({_id:-1}).limit(1)
        }else if(role){
            member = await Member.find({role: {$eq: role}})
        }else if(type){
            member = await Member.find({role: {$eq: type}})
        }else{
            member = await Member.find();
        }
    }
    catch(err){
        console.log(err);
    }
    if(!member){
        return res.status(404).json({message:"No members found!"})
    }
    return res.status(200).json({member})
}

export const addCRDToSalesman = async (req,res,next)=>{
    // const fclqueryId = req.params.id;
    const {assigned,id} = req.body;
    let member;
    try{
        member = await Member.findByIdAndUpdate(id,{
            assigned })
        }
    catch(err){
       return console.log(err);
    }
    if(!member){
        return res.status(404).json({message:"Unable to update the member!"})

    }
    return res.status(200).json({member})

};

// export const getMemberStats = async(req,res)=>{
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

//     try{
//         const data = await User.aggregate([
//             {
//                 $match: {
//                     createdAt: {
//                         $gte: lastYear
//                     }
//                 },
//                 $project: {
//                     month: {
//                         $month: "$createdAt"
//                     }
//                 },
//                 $group: {
//                     _id: "$month",
//                     total: {
//                         $sum: 1
//                     },
//                 }
//             }
//         ])
//         res.status(200).json(data)

//     } catch(err){
//         res.status(500).json(err);
//     };
// }