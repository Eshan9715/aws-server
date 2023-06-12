import mongoose from "mongoose";
import HSCodes from "../models/HSCodes.js";
import Member from "../models/Member.js";
import User from "../models/User.js";

export const getAllHSCodes = async (req,res,next)=>{
    let hsCodes;
    try{
        hsCodes = await HSCodes.find(); 
    }
    catch(err){
        console.log(err);
    }
    if(!hsCodes){
        return res.status(404).json({message:"No hsCodes found!"})
    }
    return res.status(200).json({hsCodes})

}

export const addHSCode = async (req,res,next)=>{
    const {Commudity,HSCode,user} = req.body;

    let existingUser;
    let existingMember;
    try{
        existingUser = await User.findById(user);
        existingMember = await Member.findById(user);

    } catch (err){
        return console.log(err)
    }
    if (!existingUser && !existingMember){
        return res.status(400).json({message: "Unable to find userID"})
    }
    const hscode = new HSCodes({
        Commudity,HSCode,user});

    try{
        await hscode.save();
    }
    catch(err){
    //    return console.log(err);
       return res.status(500).json({message: err})
    }
    return res.status(200).json({hscode})

};


// export const getById = async (req,res,next)=>{
//     const id = req.params.id;
//     let port;
//     try{
//         port = await Port.findById(id);
//     }catch(err){
//         console.log(err)
//     }
//     if(!port){
//         return res.status(404).json({message:"No port found"})
//     }
//     return res.status(200).json({port})

// }

export const updateHSCode = async (req,res,next)=>{
    const hscodeId = req.params.id;
    const {Commudity,HSCode} = req.body;
    let hscode;
    try{
        hscode = await HSCode.findByIdAndUpdate(hscodeId,{
            Commudity,HSCode})
        }
    catch(err){
       return console.log(err);
    }
    if(!hscode){
        return res.status(404).json({message:"Unable to update the hscode!"})

    }
    return res.status(200).json({hscode})

};



// export const deleteChapter = async (req,res,next)=>{
//     const id = req.params.id;
//     let port;
//     try{
//         port = await Port.findByIdAndRemove(id);
//     }catch(err){
//         console.log(err)
//     }
//     if(!port){
//         return res.status(500).json({message:"Unable to delete port"})
//     }
//     return res.status(200).json({message:"port deleted"})

// }

// export const deleteHeading = async (req,res,next)=>{
//     const id = req.params.id;
//     let port;
//     try{
//         port = await Port.findByIdAndRemove(id);
//     }catch(err){
//         console.log(err)
//     }
//     if(!port){
//         return res.status(500).json({message:"Unable to delete port"})
//     }
//     return res.status(200).json({message:"port deleted"})

// }
