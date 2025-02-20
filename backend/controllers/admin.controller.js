const Admin = require('../models/admin.model.js')
const bcrypt = require('bcrypt')

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

// const login = async(req,res) => {
//     try{
//         const {email,password} = req.body
//         const admin = await Admin.findOne({ email: email})
//         if (!admin){
//             return res.status(401).json({message:"Invalid id"})
//         }
//         const pwdmatch = bcrypt.compareSync(password, admin.password)

//         if (pwdmatch){
//             return res.status(401).json({message:"Password doesn't match"})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({ message: err.message})
//     }
// }

module.exports = {
    signUp,
};