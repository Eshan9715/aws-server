import mongoose from "mongoose";
import Rates from "../models/Rates.js";
import User from "../models/User.js";
import Member from "../models/Member.js";


export const getAllRates = async (req,res,next)=>{
    let rates;
    try{
        rates = await Rates.find();
    }
    catch(err){
        console.log(err);
    }
    if(!rates){
        return res.status(404).json({message:"No rates found!"})
    }
    return res.status(200).json({rates})

}

export const addRate = async (req,res,next)=>{
    const {origin,destination, discharge, shipline, zipCode,validDate, deliveryMode,remarks,user,rates} = req.body;
    let existingUser;
    try{
        existingUser = await Member.findById(user);
    } catch (err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable to find userID"})
    }
    const rate = new Rates({
        origin,destination, discharge, shipline, zipCode,validDate, deliveryMode,remarks,user,rates});

    try{
        await rate.save();
    }
    catch(err){
    //    return console.log(err);
       return res.status(500).json({message: err})
    }
    return res.status(200).json({rate})

};

export const getById = async (req,res,next)=>{
    const id = req.params.id;
    let rate;
    try{
        rate = await Rates.findById(id);
    }catch(err){
        console.log(err)
    }
    if(!rate){
        return res.status(404).json({message:"No rate found"})
    }
    return res.status(200).json({rate})

}

export const updateRate = async (req,res,next)=>{
    const rateId = req.params.id;
    const {origin,destination, discharge, shipline, zipCode,validDate, deliveryMode,remarks,user,rates} = req.body;
    let rate;
    try{
        rate = await Rates.findByIdAndUpdate(rateId,{
            origin,destination, discharge, shipline, zipCode,validDate, deliveryMode,remarks,user,rates
        })
        }
    catch(err){
       return console.log(err);
    }
    if(!rate){
        return res.status(404).json({message:"Unable to update the rate!"})

    }
    return res.status(200).json({rate})

};

export const deleteRate = async (req,res,next)=>{
    const id = req.params.id;
    let rate;
    try{
        rate = await Rates.findByIdAndRemove(id)
        // await rate.user.rates.pull(rate);
        // await rate.user.save();
    }catch(err){
        console.log(err)
    }
    if(!rate){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"rate deleted"})

}

export const getByUserId = async (req,res,next)=>{
    const userId = req.params.id;
    let userRates;
    try{
        userRates = await User.findById(userId).populate("rates")
    }catch(err){
        return console.log(err)
    }
    if(!userRates){
        return res.status(404).json({message:"No rate found"})

    }
    return res.status(200).json({user:userRates})
}