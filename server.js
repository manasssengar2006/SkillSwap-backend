import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"

import orderRoutes from "./routes/orderRoutes.js"
import skills from "./routes/skills.js";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/skills", skills);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((err) => {
    console.log("MongoDB error:", err);
});

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})