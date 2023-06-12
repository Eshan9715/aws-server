import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    role:{
        type: String,
        default: "user"
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
    tradeTerm:{
        type: String,
        required: true,
    },
    assignedTo:{
        type: String,
    },
    assignedCRD:{
        type: String,
    },
    shipperDetails:[
        {   
            shipperName: { type: String, required: true },  
            shipperAddress: { type: String, required: true },  
            shipperTele: { type: String, required: true },  
            shippermail: { type: String, required: true },           
        },
    ],

    consigneeDetails:[
        {   
            consigneeName: { type: String, required: true },  
            consigneeAddress: { type: String, required: true },  
            consigneeTele: { type: String, required: true },  
            consigneemail: { type: String, required: true },            
        },
    ],

    notifyDetails:[
        {   
            notifyName: { type: String, required: true },  
            notifyAddress: { type: String, required: true},  
            notifyTele: { type: String, required: true },  
            notifymail: { type: String, required: true },
          },
    ],
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
    fclqueries:[{type:mongoose.Types.ObjectId,
         ref: "FCLQuery",
         }],
    lclqueries:[{type:mongoose.Types.ObjectId,
        ref: "LCLQuery",
        }],
    bookings:[{type:mongoose.Types.ObjectId,
         ref: "Booking",
         required: true}],

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

export default mongoose.model("User",userSchema)
