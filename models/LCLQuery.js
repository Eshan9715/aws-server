import mongoose from "mongoose";
const Schema = mongoose.Schema;

const lclquerySchema = new Schema({
    origin:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    containerMode:{
        type: String,
        required: true
    },
    status: {
      type: String,
      default: "rates pending",
    },
    commodity: {
      type: String,
      required: true
    },
    receiver: {
      type: String,
      default: "pending",
    },
    crd: {
      type: String,
      default: "pending",
    },

    rDate:{
      type: String,
      required: true
    },

    lastShipperSeenBtn:{
      type: String,
    },
    lastMemberSeenBtn:{
      type: String,
    },

    cargo:[
    {     
      totalPackages: {
        type: String,
        },
        
      totalVolume: {
        type: Number,
        },
    
      },
    ],

    remarks:[
      {
        status: {
          type: String,
        },
        remark: {
          type: String,
        },
        dDate:{
          type: String,
        },
        userID:{
          type: String,
        },
        adder:{
          type: String,
        },
        refID:{
          type: String,
        },
      }
    ], 

    shremarks:[
      {
        status: {
          type: String,
        },
        remark: {
          type: String,
        },
        dDate:{
          type: String,
        },
        userID:{
          type: String,
        },
        adder:{
          type: String,
        },
        refID:{
          type: String,
        },
      }
    ],

    // rates:{
    //   type: Object,
    //   required: true
    // },

    rates: [
      {
        rate: {
          type: Number,
          default: 1,
        },       
        validDate: {
          type: String,
        }, 
        isFinal: {
          type: Boolean,
        },     
      },
    ],

    freight:{
      type: String,
      default:''
    },

    rateReply:{
      type: String,
      default:''
    },

    type:{
      type: String,
      default:''
    },

    selVessel:{
      type: String,
      default:''
    },

    selVoyage:{
      type: String,
      default:''
    },


    // bookingData:[
    // {     
    //   commudityType: {
    //     type: String,
    //     },
    //   hsCode: {
    //     type: String,
    //     },
    //   paymentMode: {
    //     type: String,
    //   },
    // },
    // ],
    
    blData:[
      {   
        shipperName: { type: String },  
        shipperAddress: { type: String },  
        shipperTele: { type: String },  
        shippermail: { type: String }, 

        consigneeName: { type: String },  
        consigneeAddress: { type: String },  
        consigneeTele: { type: String },  
        consigneemail: { type: String },  

        notifyName: { type: String },  
        notifyAddress: { type: String },  
        notifyTele: { type: String },  
        notifymail: { type: String },  

        markNvalues: { type: String },  
        cargoDesc: { type: String },  

        NoPackages: { type: String },  
        GrossWeight: { type: Number },  
        NetWeight: { type: Number },  
        Volume: { type: Number }, 

        containerData: { type: String },
        sealData: { type: String }
      },
    ],
    
  
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    uName:{
        type: String,
    },
    uCompany:{
        type: String,
    },
    schedules: [
      {
        vessel: {
          type: String,
        },
        voyage: {
          type: String,
        },     
        ETAD: {
          type: String,
        },
        ETAC: {
          type: String,
        },
        ETDC: {
          type: String,
        },
        LCLClosingDate: {
          type: String,
        },
        LCLClosingTime: {
          type: String,
        },
        isFinal: {
          type: Boolean,
        },
      },
    ],

    yard: {
      type: String,
    },

    // createdAt: {
    //   type: Date,
    //   immutable: true,
    //   default: ()=> Date.now()
    // },
    // updatedAt:  {
    //     type: Date,
    //     default: ()=> Date.now()
    // }, 

}, {timestamps: true}
)

export default mongoose.model("LCLQuery",lclquerySchema)
