import { json } from "express";
import mongoose from "mongoose";
import FCLQuery from "../models/FCLQuery.js";
import User from "../models/User.js";

export const getAllFCLQuries = async (req,res,next)=>{
    const qSales = req.query.sales;
    const qCRD = req.query.crd;

    let fclqueries;
    try{
        if(qCRD){
            fclqueries = await FCLQuery.find({crd: {$eq: qCRD}}).populate("user")
        }else if(qSales){
            fclqueries = await FCLQuery.find({receiver: {$eq: qSales}}).populate("user")
        // }else if(fclID && rateID){
        //     fclqueries = await FCLQuery.find({_id: {$eq: fclID},"rates._id": {$eq: rateID}})
        }
        else{
            fclqueries = await FCLQuery.find().populate("user") 
        }
    }
    catch(err){
        console.log(err);
    }
    if(!fclqueries){
        return res.status(404).json({message:"No fclqueries found!"})
    }
    return res.status(200).json({fclqueries})
}


export const addFCLQuery = async (req,res,next)=>{
    const {origin,destination, cargo, user, receiver, containerMode, rDate, uName, uCompany,commodity,freight,crd} = req.body;
    let existingUser;
    try{
        if (user.match(/^[0-9a-fA-F]{24}$/)) {
            existingUser = await User.findById(user)
        }
    } catch (err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable to find userID"})
    }
    
        const fclquery = new FCLQuery({
            origin,destination, cargo, user, receiver, containerMode, rDate,uName, uCompany, freight,crd,lastShipperSeenBtn:'', lastMemberSeenBtn:'', selShipLine:'',selVoyage:'', selVessel:'',releaseOrder:'',commodity ,assignedCRD:'' ,remarks:[], shremarks:[], rates:[], schedules:[] ,blData:[], cutoff:Object});
    
        try{
            const session = await mongoose.startSession();
            session.startTransaction();
            await fclquery.save({session});
            existingUser.fclqueries.push(fclquery);
            await existingUser.save({session})
            await session.commitTransaction();
    
        }
        catch(err){
        //    return console.log(err);
            return res.status(500).json({message: err})
        }
        return res.status(200).json({fclquery})
};

export const addRatesFCLQuery = async (req,res,next)=>{
    // const fclqueryId = req.params.id;
    const {rates,id,remarks,status} = req.body;
    let fclquery;
    try{
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(id,{
            rates,remarks,status
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const addNewRateFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {rates,id} = req.body;
    let fclquery;

    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
            fclquery = await FCLQuery.updateOne(
                { _id: fclqueryId },
                { $push: { rates: rates } }
            )      
    }}
    catch(err){
        console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found!"})
    }
    return res.status(200).json({fclquery})
};


export const alterStatusFCLQuery = async (req,res,next)=>{
    var fclqueryId = req.params.id;
    const {status} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(fclqueryId,{
            status  })
        }}
    catch(err){
        return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})    
};

export const alterStatusRateReply = async (req,res,next)=>{
    var fclqueryId = req.params.id;
    const {status,selShipLine} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(fclqueryId,{
            status,selShipLine})
        }}
    catch(err){
        return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})    
};

export const saveShipperLastSeenFCLQuery = async (req,res,next)=>{
    var fclqueryId = req.params.id;
    const {lastShipperSeenBtn} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(fclqueryId,{
            lastShipperSeenBtn  })
        }}
    catch(err){
        return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})    
};

export const saveMemberLastSeenFCLQuery = async (req,res,next)=>{
    var fclqueryId = req.params.id;
    const {lastMemberSeenBtn} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(fclqueryId,{
            lastMemberSeenBtn  })
        }}
    catch(err){
        return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})    
};

export const getShipperLastSeenFCLQuery = async (req,res,next)=>{
    var fclqueryId = req.params.id;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclqueryId,{lastShipperSeenBtn:1, _id:0 })
    }}
    catch(err){
        return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})    
};

export const getMemberLastSeenFCLQuery = async (req,res,next)=>{
    var fclqueryId = req.params.id;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclqueryId,{lastMemberSeenBtn:1, _id:0 })
    }}
    catch(err){
        return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})    
};


// export const addShipIdeaFCLQuery = async (req,res,next)=>{
//     // const fclqueryId = req.params.id;
//     const {id,status,selShipLine} = req.body;
//     let fclquery;
//     try{
//         fclquery = await FCLQuery.findByIdAndUpdate(id,{
//             status,selShipLine
//         })
//         }
//     catch(err){
//        return console.log(err);
//     }
//     if(!fclquery){
//         return res.status(404).json({message:"Unable to update the fclquery!"})

//     }
//     return res.status(200).json({fclquery})

// };

export const alterIsFinalSchFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {isFinal,selVessel} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
            fclquery = await FCLQuery.updateOne(
                { _id: fclqueryId, "schedules.vessel": selVessel },
                { $set: { "schedules.$.isFinal" : isFinal } }
            )
        }}
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const alterIsFinalRatFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {isFinal} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.updateOne(
            {  _id: fclqueryId },
            { $set: { "rates.$[].isFinal" : isFinal } }
         )
       
        }}
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const alterLineFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {selShipLine} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(fclqueryId,{
            selShipLine  })
        }}
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const addShipperIdeaFCLQuery = async (req,res,next)=>{
    var fclqueryId = req.params.id;
    const {shremarks} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.updateOne(
            { _id: fclqueryId },
            { $push: { shremarks: shremarks } }
        )
        }}
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const addMemberIdeaFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {remarks} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.updateOne(
            { _id: fclqueryId },
            { $push: { remarks: remarks } }
        )
        }}
    catch(err){
       return console.log(err);
    }
    console.log(fclquery)
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const getRemarks = async (req,res,next)=>{
    const fclID = req.params.id;
    let fclquery;
    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclID, {remarks:1, shremarks:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})

}

export const getRatesByID = async (req,res,next)=>{
    const fclID = req.params.id;
    let fclquery;
    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclID, {rates:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})

}

export const getSchedulesByID = async (req,res,next)=>{
    const fclID = req.params.id;
    let fclquery;
    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclID, {schedules:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})

}

export const getCurrentFinal = async (req,res,next)=>{
    const fclID = req.params.id;
    const rateId = req.params.keyId;
    let fclquery;
    let rateStatus;

    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclID)
        }
        }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    rateStatus = fclquery?.rates.filter(e=> e._id.equals(rateId));
    return res.status(200).send(rateStatus[0]?.isFinal)

}

export const updateCurrentFinal = async (req,res,next)=>{
    const fclID = req.params.id;
    const {keyId,isFinal} = req.body;

    let fclquery;
    let fclquery2;

    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
            fclquery = await FCLQuery.updateOne(
                { _id: fclID, "rates._id": keyId },
                { $set: { "rates.$.isFinal" : isFinal } }, {new: true}
            )
            fclquery2 = await FCLQuery.findById(fclID, {rates:1, _id:0})
        }

    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery2})

}

export const getCurrentSchFinal = async (req,res,next)=>{
    const fclID = req.params.id;
    const rateId = req.params.keyId2;
    console.log(fclID, rateId);

    let fclquery;
    let rateStatus;

    try{        
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclID)
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    rateStatus = fclquery.schedules.filter(e=> e._id.equals(rateId));
    return res.status(200).send(rateStatus[0]?.isFinal)

}

export const updateCurrentSchFinal = async (req,res,next)=>{
    const fclID = req.params.id;
    const {keyId,isFinal} = req.body;

    let fclquery;
    let fclquery2;

    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.updateOne(
            { _id: fclID, "schedules._id": keyId },
            { $set: { "schedules.$.isFinal" : isFinal } }
         )
         fclquery2 = await FCLQuery.findById(fclID, {schedules:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery2})

}

export const addScheduleFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {schedules,status} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(fclqueryId,{
            schedules,status
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const addNewScheduleFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {schedules} = req.body;
    let fclquery;

    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.updateOne(
            { _id: fclqueryId },
            { $push: { schedules: schedules } }
        )  }    
    }
    catch(err){
        console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found!"})
    }
    return res.status(200).json({fclquery})
};


export const addVesselFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {selVessel,isFinal} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
            fclquery = await FCLQuery.updateOne(
                { _id: fclqueryId, "schedules.vessel": selVessel},
                { $set: { "schedules.$.isFinal" : isFinal } }
            )
        }
    }
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

// export const addBookingDataFCLQuery = async (req,res,next)=>{
//     // const fclqueryId = req.params.id;
//     const {id,bookingData,status} = req.body;
//     let fclquery;
//     try{
//         fclquery = await FCLQuery.findByIdAndUpdate(id,{
//             bookingData,status
//         })
//         }
//     catch(err){
//        return console.log(err);
//     }
//     if(!fclquery){
//         return res.status(404).json({message:"Unable to update the fclquery!"})

//     }
//     return res.status(200).json({fclquery})

// };

export const addReleaseFCLQuery = async (req,res,next)=>{
    // const fclqueryId = req.params.id;
    const {id,status, releaseOrder} = req.body;
    let fclquery;
    try{
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(id,{
            status, releaseOrder
        })}
        }
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const addCutOffFCLQuery = async (req,res,next)=>{
    const fclqueryId = req.params.id;
    const {status, cutoff} = req.body;
    let fclquery;
    try{
        if (fclqueryId.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(fclqueryId,{
            status, cutoff
        })
        }}
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};


export const addBLFCLQuery = async (req,res,next)=>{
    // const fclqueryId = req.params.id;
    const {id,status, blData} = req.body;
    let fclquery;
    try{
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(id,{
            status, blData
        })}
        }
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const saveBLFCLQuery = async (req,res,next)=>{
    // const fclqueryId = req.params.id;
    const {id, blData} = req.body;
    let fclquery;
    try{
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findByIdAndUpdate(id,{
            blData
        })}
        }
    catch(err){
       return console.log(err);
    }
    if(!fclquery){
        return res.status(404).json({message:"Unable to update the fclquery!"})

    }
    return res.status(200).json({fclquery})

};

export const getFCLBLData = async (req,res,next)=>{
    const fclID = req.params.id;
    let fclquery;
    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclID, {blData:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})

}



export const getById = async (req,res,next)=>{
    const id = req.params.id;
    let fclquery;
    try{
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(id)
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})

}

export const getFCLRateByID = async (req,res,next)=>{
    const {id} = req.body;
    let fclquery;
    try{
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(id)
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }
    return res.status(200).json({fclquery})

}

export const deleteFCLQuery = async (req,res,next)=>{
    const id = req.params.id;
    let fclquery;
    try{
        fclquery = await FCLQuery.findByIdAndRemove(id).populate("user")
        await fclquery.user.fclqueries.pull(fclquery);
        await fclquery.user.save();
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"fclquery deleted"})

}

export const getByUserId = async (req,res,next)=>{
    const userId = req.params.id;
    let userFCLQuries;
    try{
        userFCLQuries = await User.findById(userId).populate("fclqueries")
    }catch(err){
        return console.log(err)
    }
    if(!userFCLQuries){
        return res.status(404).json({message:"No fclquery found"})

    }
    return res.status(200).json({user:userFCLQuries})
}

export const getCutOffData = async (req,res,next)=>{
    const fclID = req.params.id;
    let fclquery;
    try{
        if (fclID.match(/^[0-9a-fA-F]{24}$/)) {
        fclquery = await FCLQuery.findById(fclID, {cutoff:1, _id:0})
        }
    }catch(err){
        console.log(err)
    }
    if(!fclquery){
        return res.status(404).json({message:"No fclquery found"})
    }

    return res.status(200).json({fclquery})

}

// let fclqueries;
// try{
//     if(qCRD){
//         fclqueries = await FCLQuery.find({crd: {$eq: qCRD}}).populate("user");
//     }else if(qSales){
//         fclqueries = await FCLQuery.find({receiver: {$eq: qSales}}).populate("user");
//     }else{
//         fclqueries = await FCLQuery.find().populate("user"); 
//     }
// }
// catch(err){
//     console.log(err);
// }



