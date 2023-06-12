import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hscodeSchema = new Schema({
    Commudity:{
        type: String,
        required: true,
    },
    HSCode:{
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
}, {timestamps: true}
)

export default mongoose.model("HSCodes",hscodeSchema)

