import mongoose from "mongoose";
import Line from "../models/Line.js";
import Member from "../models/Member.js";

export const getAllLines = async (req,res,next)=>{
    let lines;
    try{
        lines = await Line.find(); 
    }
    catch(err){
        console.log(err);
    }
    if(!lines){
        return res.status(404).json({message:"No lines found!"})
    }
    return res.status(200).json({lines})

}

export const addLine = async (req,res,next)=>{
    const {LineName,LineLogo,user} = req.body;
    let existingUser;
    try{
        existingUser = await Member.findById(user);
    } catch (err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable to find userID"})
    }
    const line = new Line({
        LineName,LineLogo });

    try{
        await line.save();

    }
    catch(err){
    //    return console.log(err);
       return res.status(500).json({message: err})
    }
    return res.status(200).json({line})

};

export const getById = async (req,res,next)=>{
    const id = req.params.id;
    let line;
    try{
        line = await Line.findById(id);
    }catch(err){
        console.log(err)
    }
    if(!line){
        return res.status(404).json({message:"No line found"})
    }
    return res.status(200).json({line})

}

export const updateLine = async (req,res,next)=>{
    const lineId = req.params.id;
    const {LineName,LineLogo} = req.body;
    let line;
    try{
        line = await line.findByIdAndUpdate(lineId,{
            LineName,LineLogo
        })
        }
    catch(err){
       return console.log(err);
    }
    if(!line){
        return res.status(404).json({message:"Unable to update the line!"})

    }
    return res.status(200).json({line})

};

export const deleteLine = async (req,res,next)=>{
    const id = req.params.id;
    let line;
    try{
        line = await Line.findByIdAndRemove(id);
       
    }catch(err){
        console.log(err)
    }
    if(!line){
        return res.status(500).json({message:"Unable to delete line"})
    }
    return res.status(200).json({message:"line deleted"})

}

// export const getByUserId = async (req,res,next)=>{
//     const userId = req.params.id;
//     let userTodos;
//     try{
//         userTodos = await Shipper.findById(userId).populate("todos")
//     }catch(err){
//         return console.log(err)
//     }
//     if(!userTodos){
//         return res.status(404).json({message:"No bquery found"})

//     }
//     return res.status(200).json({user:userTodos})
// }