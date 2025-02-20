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

const getClubs = async(req,res) => {
    try{
        const clubs =await Club.find({})

        res.status(200).json({clubs})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
}

const getClubbyId = async(req,res) => {
    try{
        const club =await Club.findById(req.params.id);
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
          }
        res.status(201).json({club})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
}

module.exports = {
    createClub,
    getClubs,
    getClubbyId
}