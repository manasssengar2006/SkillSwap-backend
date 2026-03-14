import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: String,
  category: String,
  price: Number,
  delivery: String,
  description: String,
  tags: [String],
  name: String,
  avatar: String,
  college: String,
  rating: Number
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);