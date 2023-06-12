import mongoose from "mongoose";
import Member from "../models/Member.js";
import Destination from "../models/Destination.js";

export const getAllDestinations = async (req,res,next)=>{
    let destinations;
    try{
        destinations = await Destination.find(); 
    }
    catch(err){
        console.log(err);
    }
    if(!destinations){
        return res.status(404).json({message:"No destinations found!"})
    }
    return res.status(200).json({destinations})

}

export const adddestination = async (req,res,next)=>{
    const {ObjectName,ObjectCode, CountryName,user,CountryCode,State} = req.body;

    let existingUser;
    try{
        existingUser = await Member.findById(user);
    } catch (err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable to find userID"})
    }
    const destination = new Destination({
        ObjectName,ObjectCode, CountryName,CountryCode,State});

    try{
        await destination.save();
    }
    catch(err){
    //    return console.log(err);
       return res.status(500).json({message: err})
    }
    return res.status(200).json({destination})

};

export const getById = async (req,res,next)=>{
    const id = req.params.id;
    let destination;
    try{
        destination = await Destination.findById(id);
    }catch(err){
        console.log(err)
    }
    if(!port){
        return res.status(404).json({message:"No destination found"})
    }
    return res.status(200).json({destination})

}

export const updateDestination = async (req,res,next)=>{
    const destinationId = req.params.id;
    const {ObjectName,ObjectCode, CountryName,CountryCode,State} = req.body;
    let destination;
    try{
        destination = await Destination.findByIdAndUpdate(destinationId,{
            ObjectName,ObjectCode, CountryName,CountryCode,State})
        }
    catch(err){
       return console.log(err);
    }
    if(!destination){
        return res.status(404).json({message:"Unable to update the destination!"})

    }
    return res.status(200).json({destination})

};

export const deleteDestination = async (req,res,next)=>{
    const id = req.params.id;
    let destination;
    try{
        destination = await Destination.findByIdAndRemove(id);
    }catch(err){
        console.log(err)
    }
    if(!destination){
        return res.status(500).json({message:"Unable to delete destination"})
    }
    return res.status(200).json({message:"destination deleted"})

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