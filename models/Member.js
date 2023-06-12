import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    role:{
        type: String,
        default: "crd"
    },
    companyName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    mobileNumber:{
        type: String,
        required: true,
    },
    clients:{
        type: Array,
        required:true
    },
    assigned:{
        type: Array,
    },
    
    // alerts:[
    //     {
    //         senderId:{
    //             type: String,

    //         },
    //         body:{
    //             type: String,
    //         }
    //     }
    // ],
    

    // createdAt: {
    //     type: Date,
    //     immutable: true,
    //     default: ()=> Date.now()
    //     },
    // updatedAt:  {
    //     type: Date,
    //     default: ()=> Date.now()
    // },
},{timestamps: true}
)

export default mongoose.model("Member",memberSchema)
