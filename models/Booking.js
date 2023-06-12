import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
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

    cargoFCL: [
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

    cargoLCL: [
      {
        packageType: {
          type: String,
        },
        packageCount: {
          type: Number,
          default: 1,
        },
        packageVolume: {
          type: Number,
          default: 1,
        },
        packageGrossWeight: {
          type: Number,
          default: 1,
        },
        packageNetWeight: {
          type: Number,
          default: 1,
        },
      },
    ],
      userId: { 
        type: String, 
        required: true 
    },

    // createdAt: {
    //     type: Date,
    //     immutable: true,
    //     default: ()=> Date.now()
    // },
    // updatedAt:  {
    //     type: Date,
    //     default: ()=> Date.now()
    // },
  
    shipper:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
  
},{timestamps: true}
)

export default mongoose.model("Booking",bookingSchema)
