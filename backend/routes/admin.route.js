const express = require("express")
const router = express.Router()
const {signUp} = require("../controllers/admin.controller.js")

router.post("/signup",signUp)

module.exports = router;