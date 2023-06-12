import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ratesSchema = new Schema({
    origin:{
        type: String,
        required: true
    },
    destination:{
        type: String,
    },
    discharge:{
        type: String,
        required: true
    },
    shipline:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
    },
    deliveryMode:{
        type: String,
        required: true
    },
    validDate:{
        type: String,
        required: true
    },
    remarks:{
        type: String,
        required: true
    },
    rates: [
        {
          containerType: {
            type: String,
            required: true

          },
          rate: {
            type: Number,
            default: 1,
          },
        },
    ],
    // createdAt: {
    //     type: Date,
    //     immutable: true,
    //     default: ()=> Date.now()
    // },
    // updatedAt:  {
    //     type: Date,
    //     default: ()=> Date.now()
    // },
    user:{
        type: String,
        required: true,
        unique: true
    },
  
},{timestamps: true}
)

export default mongoose.model("Rates",ratesSchema)
