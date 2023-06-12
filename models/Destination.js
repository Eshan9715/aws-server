import mongoose from "mongoose";
const Schema = mongoose.Schema;

const destinySchema = new Schema({
    ObjectName:{
        type: String,
        required: true,
    },
    ObjectCode:{
        type: String,
        default: '',

    },
    CountryName:{
        type: String,
        required: true,
    },
    CountryCode:{
        type: String,
        required: true,
    },
    State:{
        type: String,
        required: true,
    },
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

export default mongoose.model("Destination",destinySchema)
