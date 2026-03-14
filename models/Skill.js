import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({

title:String,

description:String,

price:Number,

category:String,

seller:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{timestamps:true})

export default mongoose.model("Skill",skillSchema)
