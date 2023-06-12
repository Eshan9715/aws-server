import User from '../models/User.js'
import Member from '../models/Member.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req,res,next)=>{
    const {name, companyName, email, password, image, mobileNumber, username, tradeTerm, assignedTo, assignedCRD} = req.body;
    let existingUser;
    let existingMember;

    try{
        existingUser = await User.findOne({email})
        existingMember = await Member.findOne({email})
       
    }catch(err){
        return console.log(err)
    }
    if(existingUser || existingMember){
        return res.status(400).json({message:"User already exits!"})
    }
    const hashPassword = bcrypt.hashSync(password);

    if(companyName.toLowerCase().includes("freight links") && (/^[a-z.-]+@(freight+(-)+links+\.)+(com)$/i).test(email)){
        const user = new Member({
            name,
            username,
            companyName,
            email,
            image,
            mobileNumber,
            password: hashPassword,
            todos:[],
            clients:[],
            assigned:[],
        });
        try{
           await user.save();
        }catch(err){
            return console.log(err)
        }
        return res.status(201).json({user})

    } else {
        const user = new User({
            name,
            username,
            companyName,
            email,
            image,
            mobileNumber,
            tradeTerm,
            password: hashPassword,
            fclqueries:[],
            lclqueries:[],
            bookings:[],
            todos:[],
            shipperDetails:[],
            consigneeDetails:[],
            notifyDetails:[],
            assignedTo,
            assignedCRD
        });
        try{
           await user.save();
        }catch(err){
            return console.log(err)
        }
        return res.status(201).json({user})
    }
}

export const login = async (req,res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    let existingMember;
    let isUCorrectPassword;
    let isMCorrectPassword;

    try{
        existingUser = await User.findOne({email})
        existingMember = await Member.findOne({email})
       
    }catch(err){
        return console.log(err)
    }

    if(!existingUser && !existingMember){
        return res.status(404).json({message:"Couldn't find user with this mail!"})
    }
    if(existingUser){
        isUCorrectPassword = bcrypt.compareSync(password, existingUser?.password);
    } else if(existingMember){
        isMCorrectPassword = bcrypt.compareSync(password, existingMember?.password);
    }

    if (!isUCorrectPassword && !isMCorrectPassword){
        return res.status(400).json({message:"Incorrect Password!"})
    }

    const accessToken = jwt.sign(
    {
        id: existingUser?._id || existingMember?._id,
        role: existingUser?.role || existingMember?.role,
    },
    eshan,  //process.env.JWT_KEY
    {expiresIn:"1d"}
    );
    
    return res.status(200).json({message:"Login successful!", user: existingUser || existingMember, token: accessToken})
}

export const FindUser = async (req,res,next)=>{
    let existingUser;
    let existingMember;
    const uid = req.query.id;

    try{
        if(uid){
            existingUser = await User.findById(uid, {name:1, _id:0});
            existingMember = await Member.findById(uid, {name:1, _id:0});
        }
       
    }catch(err){
        return console.log(err)
    }

    if(!existingUser && !existingMember){
        return res.status(404).json({message:"Couldn't find user with this name!"})
    }

    return res.status(200).json({user: existingUser || existingMember})

}
