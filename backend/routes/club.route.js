const express = require("express")
const router = express.Router()
const {createClub, getClubs} = require("../controllers/club.controller.js")

router.post("/create-club",createClub)
router.post("/get-clubs",getClubs)

module.exports = router;