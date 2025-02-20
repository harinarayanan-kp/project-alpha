const express = require("express")
const router = express.Router()
const {createClub} = require("../controllers/club.controller.js")

router.post("/create-club",createClub)

module.exports = router;