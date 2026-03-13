import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import skillRoutes from "./routes/skillRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/orders", orderRoutes)

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