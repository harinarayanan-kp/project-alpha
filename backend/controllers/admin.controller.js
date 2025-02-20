const Admin = require('../models/admin.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    try{
        const {email, password} = req.body
        const hashedpwd =  bcrypt.hashSync(password, 8)

        await Admin.create({email,password:hashedpwd})

        res.status(201).json({message: "Admin sign up successful"})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
}

const login = async(req,res) => {
    try{
        const {email,password} = req.body
        const admin = await Admin.findOne({ email: email})
        if (!admin){
            return res.status(401).json({message:"Invalid id"})
        }
        const pwdmatch = bcrypt.compareSync(password, admin.password)
        if (!pwdmatch){
            return res.status(401).json({message:"Password doesn't match"})
        }
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({sub:admin._id, exp},process.env.JWT_SECRET)

        res.cookie("Authorization",token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV=== "production",
        })
        res.status(200).json({ message: "Login Successful!"})
    
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
}

const logout = async (req,res) => {
    try{
    res.clearCookie("Authorization");
    res.status(401).json({ message: "Logout Successful!"})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
}

module.exports = {
    signUp,
    login,
    logout,
};