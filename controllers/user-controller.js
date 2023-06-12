import User from '../models/User.js'
import Member from '../models/Member.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const jwtVerify = async (req,res,next)=>{
    const {password} = req.body
    if(password){
        const hashPassword = bcrypt.hashSync(password);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedUser);

    } catch (err){
        res.status(500).json(err);
    }
}

// export const deleteUser = async(req,res)=>{
//     try{
//         await User.findByIdAndDelete(req.params.id)
//         res.status(200).json("user has been deleted");
//     } catch(err){
//         res.status(500).json(err);

//     }
// }

export const getUser = async(req,res)=>{
    let user;
    const uid = req.params.id;
    try{
        if(uid.match(/^[0-9a-fA-F]{24}$/)) {
            user = await User.findById(uid)
        }
    } catch(err){
        console.log(err);
    }
    return res.status(200).json({user})
}

export const getAllUsers = async(req,res)=>{
    const assToquery = req.query.assignedTo;
    const assCRDquery = req.query.assignedCRD;
    const assToNequery = req.query.assigned;
    let users;
    try{
        if(assToquery){
            users = await User.find({assignedTo: {$eq: assToquery}})
        }else if(assCRDquery){
            users = await User.find({assignedCRD: {$eq: assCRDquery}})
        }else if(assToNequery){
            users = await User.find( { $and: [ { assignedTo: { $ne: 'pending' } }, { assignedTo: { $ne: 'Public' } }]}  )          
        }else{
            users = await User.find();
        }
    }
    catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No users found!"})
    }
    return res.status(200).json({users})
}

export const addSalesmanToUser = async (req,res,next)=>{
    // const fclqueryId = req.params.id;
    const {assignedTo,id} = req.body;
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{
            assignedTo })
        }
    catch(err){
       return console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"Unable to update the user!"})

    }
    return res.status(200).json({user})

};

export const addCRDToUser = async (req,res,next)=>{
    // const fclqueryId = req.params.id;
    const {assignedCRD,id} = req.body;
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{
            assignedCRD })
        }
    catch(err){
       return console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"Unable to update the user!"})

    }
    return res.status(200).json({user})

};

export const addShipperData = async (req,res,next)=>{
    const shipID = req.params.id;
    const {shipperDetails} = req.body;
    let user;

    try{
        user = await User.updateOne(
            { _id: shipID },
            { $push: { shipperDetails: shipperDetails } }
         )
        }
    catch(err){
       return console.log(err);
    }

    if(!user){
        return res.status(404).json({message:"Unable to update the user!"})

    }
    return res.status(200).json({user})

};

export const addConsigneeData = async (req,res,next)=>{
    const conID = req.params.id;
    const {consigneeDetails} = req.body;
    let user;
    try{
        user = await User.updateOne(
            { _id: conID },
            { $push: { consigneeDetails: consigneeDetails } }
         )
        }
    catch(err){
       return console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"Unable to update the user!"})

    }
    return res.status(200).json({user})

};

export const addNotifyData = async (req,res,next)=>{
    const notID = req.params.id;
    const {notifyDetails} = req.body;
    let user;
    try{
        user = await User.updateOne(
            { _id: notID },
            { $push: { notifyDetails: notifyDetails } }
         )
        }
    catch(err){
       return console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"Unable to update the user!"})

    }
    return res.status(200).json({user})

};

export const getByIdShipperData = async (req,res,next)=>{
    const UIid = req.params.id;
    let user;
    try{
        user = await User.findById(UIid, {shipperDetails:1,_id:0})
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({user})

}

export const getByIdConsigneeData = async (req,res,next)=>{
    const Uiid = req.params.id;
    let user;
    try{
        user = await User.findById(Uiid, {consigneeDetails:1,_id:0})
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({user})

}
export const getByIdNotifyData = async (req,res,next)=>{
    const Ueid = req.params.id;
    let user;
    try{
        user = await User.findById(Ueid, {notifyDetails:1,_id:0})
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({user})

}




// export const getUserStats = async(req,res)=>{
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