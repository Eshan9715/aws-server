import mongoose from "mongoose";
const Schema = mongoose.Schema;

const lineSchema = new Schema({
    LineName:{
        type: String,
        required: true,
    },
    LineLogo:{
        type: String,
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

export default mongoose.model("Line",lineSchema)
