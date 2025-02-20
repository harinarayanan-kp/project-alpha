const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/Authmiddleware.js")
const {signUp,login,logout} = require("../controllers/admin.controller.js")

router.post("/signup",signUp)
router.post("/login", login)
router.post("/logout", authMiddleware, logout)

module.exports = router;