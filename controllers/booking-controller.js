import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import User from "../models/User.js";


export const getAllBookings = async (req,res,next)=>{
    let bookings;
    try{
        bookings = await Booking.find().populate("user"); 
    }
    catch(err){
        console.log(err);
    }
    if(!bookings){
        return res.status(404).json({message:"No bookings found!"})
    }
    return res.status(200).json({bookings})


}

export const addBooking = async (req,res,next)=>{
    const {origin,destination, containerMode, description, image, user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    } catch (err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable to find userID"})
    }
    const booking = new Booking({
        title,headline, type, description, image, user
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.save({session});
        existingUser.bookings.push(booking);
        await existingUser.save({session})
        await session.commitTransaction();
    }
    catch(err){
    //    return console.log(err);
       return res.status(500).json({message: err})
    }
    return res.status(200).json({booking})

};

export const getById = async (req,res,next)=>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findById(id);
    }catch(err){
        console.log(err)
    }
    if(!booking){
        return res.status(404).json({message:"No booking found"})
    }
    return res.status(200).json({booking})

}

export const deleteBooking = async (req,res,next)=>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findByIdAndRemove(id).populate("user");
        await booking.user.bqueries.pull(booking);
        await booking.user.save();
    }catch(err){
        console.log(err)
    }
    if(!booking){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"booking deleted"})

}

export const getByUserId = async (req,res,next)=>{
    const userId = req.params.id;
    let userBookings;
    try{
        userBookings = await User.findById(userId).populate("bookings")
    }catch(err){
        return console.log(err)
    }
    if(!userBookings){
        return res.status(404).json({message:"No booking found"})

    }
    return res.status(200).json({user:userBookings})
}