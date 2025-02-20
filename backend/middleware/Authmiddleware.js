const jwt = require('jsonwebtoken')
const Admin = require("../models/admin.model.js")
require("dotenv").config();

const Authmiddleware = async (req,res,next) => {
    try{
        const token = req.cookies.Authorization
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if (Date.now()>decoded.exp){
            return res.status(401).json({message:"token expired"})
        }
        const admin = await Admin.findById(decoded.sub)
        if (!admin){
            return res.status(401).json({message:"Invalid id"})
        }
        req.admin=admin
        next()
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}
module.exports = Authmiddleware
