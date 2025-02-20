const express = require("express")
const router = express.Router()
const {createClub, getClubs, getClubbyId} = require("../controllers/club.controller.js")

router.post("/create-club",createClub)
router.get("/get-clubs",getClubs)
router.get("/get-club/:id", getClubbyId);

module.exports = router;