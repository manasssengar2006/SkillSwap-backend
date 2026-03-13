import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

buyer:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

skill:{
type:mongoose.Schema.Types.ObjectId,
ref:"Skill"
},

status:{
type:String,
default:"pending"
}

},{timestamps:true})

export default mongoose.model("Order",orderSchema)