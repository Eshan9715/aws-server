import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fclquerySchema = new Schema({
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
    crd: {
      type: String,
      default: "pending",
    },
    commodity: {
      type: String,
      required: true
    },
    receiver: {
      type: String,
      required: true
    },
    cargo: [
        {
          containerType: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
    ],
    // cutoff: [
    //   {
    //     ETDColombo: {
    //       type: String,
    //     },
    //     FCLClosing: {
    //       type: String,
    //     },
    //     BLClosing: {
    //       type: String,
    //     },
    //     VGMClosing: {
    //       type: String,
    //     },      
    //   },
    // ],

    cutoff:{
      type: Object,
      required: true
    },

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

    rDate:{
      type: String,
      required: true
    },

    selShipLine:{
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
    
    assignedCRD:{
      type: String,
      default:''
    },

    freight:{
      type: String,
      default:''
    },

    releaseOrder:{
      type: String,
      default:''
    },

    lastShipperSeenBtn:{
      type: String,
    },
    lastMemberSeenBtn:{
      type: String,
    },
    
    // bookingData:[
    //  {     
    //   commudityType: {
    //     type: String,
    //     },
    //   hsCode: {
    //     type: String,
    //     },
    //   paymentMode: {
    //     type: String,
    //   },
    //   },
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

    rates: [
      {
        shipLine: {
          type: String,
        },
        validDate: {
          type: String,
        },
        container: {
          type: String,
        },
        rate: {
          type: Number,
          default: 1,
        },
        isFinal: {
          type: Boolean,
        },
      },
    ],

    schedules: [
      {
        vessel: {
          type: String,
        },
        voyage: {
          type: String,
        },
        ETD: {
          type: String,
        },
        ETA: {
          type: String,
        },
        transit: {
          type: Number,
          default: 1,
        },
        shipMode: {
          type: String,
        },
        transhipments: {
          type: String,
        },
        isFinal: {
          type: Boolean,
        },
      },
    ],
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

export default mongoose.model("FCLQuery",fclquerySchema)
