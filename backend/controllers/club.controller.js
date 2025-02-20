const Club = require('../models/club.model.js')

const createClub = async (req, res) => {
    try{
        const {name} = req.body

        await Club.create({name})

        res.status(201).json({message: "Club created successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
}

module.exports = {
    createClub
}