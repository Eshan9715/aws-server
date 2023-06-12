import mongoose from "mongoose";
import LCLQuery from "../models/LCLQuery.js";
import User from "../models/User.js";
import Member from "../models/Member.js";

export const getAllLCLQuries = async (req,res,next)=>{
    const qSales = req.query.sales;
    const qCRD = req.query.crd;
    const uid = req.query.ID;
    const consy = req.query.type;

    let lclqueries;
    try{
        if(qCRD){
            lclqueries = await LCLQuery.find({crd: {$eq: qCRD}})
        }else if(qSales){
            lclqueries = await LCLQuery.find({receiver: {$eq: qSales}}).populate("user")
        }else if(uid){
            lclqueries = await LCLQuery.find({user: {$eq: uid}})
        }else if(consy){
            lclqueries = await LCLQuery.find({ type: { $in: [ "Direct", "Co-Load", "T/S" ] } })
        }else{
            lclqueries = await LCLQuery.find().populate("user") 
        }
    }
    catch(err){
        console.log(err);
    }
    if(!lclqueries){
        return res.status(404).json({message:"No lclqueries found!"})
    }
    return res.status(200).json({lclqueries})
}


export const addLCLQuery = async (req,res,next)=>{
    const {origin,destination, cargo, user, receiver, containerMode, rDate,uName, uCompany, commodity,freight,crd,type} = req.body;

    let existingUser;
    let existingMember;
    let lclquery;

    try{
        existingUser = await User.findById(user)
        existingMember = await Member.findById(user)

    } catch (err){
        return console.log(err)
    }
    if (!existingUser && !existingMember){
        return res.status(400).json({message: "Unable to find userID"})                    
    }

    if(existingUser){
    lclquery = new LCLQuery({
        origin,destination, cargo, user, receiver, containerMode,rDate,uName,freight,crd, lastShipperSeenBtn:'', lastMemberSeenBtn:'', type, uCompany,commodity, yard:'', selVessel:'',releaseOrder:'' ,remarks:[], shremarks:[], rates:[], schedules:[], blData:[]});  //rates:Object

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await lclquery.save({session});
        existingUser.lclqueries.push(lclquery);
        await existingUser.save({session})
        await session.commitTransaction();
    }
    catch(err){
       return res.status(500).json({message: err})
    }
    }else if(existingMember){
        lclquery = new LCLQuery({
            origin,destination, cargo, user, receiver, containerMode,rDate,uName,freight,crd, type, uCompany,commodity, yard:'', selVessel:'',releaseOrder:'' ,assignedCRD:'' ,remarks:[], shremarks:[], rates:[], schedules:[], blData:[]});
    
        try{
            await lclquery.save();    
        }
        catch(err){
           return res.status(500).json({message: err})
        }
    }
    return res.status(200).json({lclquery})
};

export const addRatesLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {rates,remarks,status,crd} = req.body;
    let lclquery;

    try{
        if(crd===''){
            if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
            lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
                rates,remarks,status
            })}        
        }else{
            if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
            lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
                rates,remarks,status,crd
            })}
        }
    }
    catch(err){
        console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found!"})
    }
    return res.status(200).json({lclquery})
};

export const addNewRateLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {rates} = req.body;
    let lclquery;

    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.updateOne(
            { _id: lclqueryId },
            { $push: { rates: rates } }
        )}      
    }
    catch(err){
        console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found!"})
    }
    return res.status(200).json({lclquery})
};

export const alterStatusLCLQuery = async (req,res,next)=>{
    var lclqueryId = req.params.id;
    const {status} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            status  })
        }}
    catch(err){
        return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})    
};

export const alterStatusRateReply = async (req,res,next)=>{
    var lclqueryId = req.params.id;
    const {status,rateReply} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            status,rateReply})
        }}
    catch(err){
        return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})    
};

export const saveShipperLastSeenLCLQuery = async (req,res,next)=>{
    var lclqueryId = req.params.id;
    const {lastShipperSeenBtn} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            lastShipperSeenBtn  })
        }}
    catch(err){
        return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})    
};

export const saveMemberLastSeenLCLQuery = async (req,res,next)=>{
    var lclqueryId = req.params.id;
    const {lastMemberSeenBtn} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            lastMemberSeenBtn  })
        }}
    catch(err){
        return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})    
};

export const getShipperLastSeenLCLQuery = async (req,res,next)=>{
    var lclqueryId = req.params.id;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findById(lclqueryId,{lastShierSeenBtn:1, _id:0 })
    }}
    catch(err){
        return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    return res.status(200).json({lclquery})    
};

export const getMemberLastSeenLCLQuery = async (req,res,next)=>{
    var lclqueryId = req.params.id;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findById(lclqueryId,{lastMemberSeenBtn:1, _id:0 })
    }}
    catch(err){
        return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    return res.status(200).json({lclquery})    
};

// export const getCurrentSchFinal = async (req,res,next)=>{
//     const fclID = req.params.id;
//     const rateId = req.params.keyId2;
//     console.log(fclID, rateId);

//     let fclquery;
//     let rateStatus;

//     try{        
//         fclquery = await FCLQuery.findById(fclID);
        
//     }catch(err){
//         console.log(err)
//     }
//     if(!fclquery){
//         return res.status(404).json({message:"No fclquery found"})
//     }
//     rateStatus = fclquery.schedules.filter(e=> e._id.equals(rateId));
//     return res.status(200).send(rateStatus[0].isFinal)

// }

// export const updateCurrentSchFinal = async (req,res,next)=>{
//     const fclID = req.params.id;
//     const {keyId,isFinal} = req.body;

//     let fclquery;
//     try{
//         fclquery = await FCLQuery.updateOne(
//             { _id: fclID, "schedules._id": keyId },
//             { $set: { "schedules.$.isFinal" : isFinal } }
//          )
//     }catch(err){
//         console.log(err)
//     }
//     if(!fclquery){
//         return res.status(404).json({message:"No fclquery found"})
//     }
//     return res.status(200).json({fclquery})

// }



    // try{

    //     lclquery = await LCLQuery.findByIdAndUpdate(id,{
    //         rates,remarks,status
    //     })
    //     }
    // catch(err){
    //    return console.log(err);
    // }
    // if(!lclquery){
    //     return res.status(404).json({message:"Unable to update the lclquery!"})

    // }
    // return res.status(200).json({lclquery})


export const addShipIdeaLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {shremarks,status,rateReply} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            shremarks,status,rateReply
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const alterIsFinalSchLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {isFinal,selVessel} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.updateOne(
            { _id: lclqueryId, "schedules.vessel": selVessel },
            { $set: { "schedules.$.isFinal" : isFinal } }
         )
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const alterIsFinalRatLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {isFinal} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.updateOne(
            {  _id: lclqueryId },
            { $set: { "rates.isFinal" : isFinal } }
         )
       
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const alterLinelCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {selShipLine} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            selShipLine  })
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const addShipperIdeaLCLQuery = async (req,res,next)=>{
    var lclqueryId = req.params.id;
    const {shremarks} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.updateOne(
            { _id: lclqueryId },
            { $push: { shremarks: shremarks } }
        )
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const addMemberIdeaLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {remarks} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.updateOne(
            { _id: lclqueryId },
            { $push: { remarks: remarks } }
        )
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const getRateReply = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findById(lclqueryId, {rateReply:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    return res.status(200).json({lclquery})

}

export const getRemarks = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findById(lclqueryId, {remarks:1, shremarks:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    return res.status(200).json({lclquery})

}

export const getCurrentLFinal = async (req,res,next)=>{
    const lclID = req.params.id;
    const rateId = req.params.keyId;
    // console.log(lclID, rateId);

    let lclquery;
    let rateStatus;

    try{
        if (lclID.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findById(lclID)
        }
        }catch(err){
        console.log(err)
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    rateStatus = lclquery.rates.filter(e=> e._id.equals(rateId));
    return res.status(200).send(rateStatus[0]?.isFinal)

}

export const updateCurrentLFinal = async (req,res,next)=>{
    const lclID = req.params.id;
    const {keyId,isFinal} = req.body;

    let lclquery;
    try{
        if (lclID.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.updateOne(
            { _id: lclID, "rates._id": keyId },
            { $set: { "rates.$.isFinal" : isFinal } }
         )
        }
    }catch(err){
        console.log(err)
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    return res.status(200).json({lclquery})

}
export const addScheduleLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {schedules,status,yard} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            schedules,status,yard
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const addVesselLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {status, selVessel} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(id,{
            status,selVessel
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const getById = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findById(lclqueryId)
        }
    }catch(err){
        console.log(err)
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    return res.status(200).json({lclquery})

}

export const deleteLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndRemove(lclqueryId).populate("user")
        await lclquery.user.lclqueries.pull(lclquery);
        await lclquery.user.save();
        }
    }catch(err){
        console.log(err)
    }
    if(!lclquery){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"lclquery deleted"})

}

export const getByUserId = async (req,res,next)=>{
    const userId = req.params.id;
    let userLCLQuries;
    try{
        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
        userLCLQuries = await User.findById(userId).populate("lclqueries")
        }
    }catch(err){
        return console.log(err)
    }
    if(!userLCLQuries){
        return res.status(404).json({message:"No lclquery found"})

    }
    return res.status(200).json({user:userLCLQuries})
}

export const addBLLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const {status, blData} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            status, blData
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const saveBLLCLQuery = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    const { blData} = req.body;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findByIdAndUpdate(lclqueryId,{
            blData
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!lclquery){
        return res.status(404).json({message:"Unable to update the lclquery!"})

    }
    return res.status(200).json({lclquery})

};

export const getLCLBLData = async (req,res,next)=>{
    const lclqueryId = req.params.id;
    let lclquery;
    try{
        if (lclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        lclquery = await LCLQuery.findById(lclqueryId, {blData:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!lclquery){
        return res.status(404).json({message:"No lclquery found"})
    }
    return res.status(200).json({lclquery})

}