import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {

try {

const { name, email, password, role } = req.body

// Validation
if(!name || !email || !password){
return res.status(400).json({ message:"All fields required" })
}

// Check existing user
const existingUser = await User.findOne({ email })

if(existingUser){
return res.status(400).json({ message:"User already exists" })
}

// Hash password
const hashed = await bcrypt.hash(password,10)

// Create user
const user = await User.create({
name,
email,
password: hashed,
role
})

// Remove password from response
const userData = {
_id: user._id,
name: user.name,
email: user.email,
role: user.role
}

res.json(userData)

} catch(err){

console.log(err)
res.status(500).json({ message:"Server error" })

}

}


export const login = async (req,res)=>{

try{

const { email, password } = req.body

const user = await User.findOne({ email })

if(!user){
return res.status(400).json({ message:"User not found" })
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({ message:"Wrong password" })
}

const token = jwt.sign(
{ id:user._id, role:user.role },
process.env.JWT_SECRET,
{ expiresIn:"7d" }
)

const userData = {
_id:user._id,
name:user.name,
email:user.email,
role:user.role
}

res.json({
token,
user:userData
})

}catch(err){

console.log(err)
res.status(500).json({message:"Server error"})

}

}