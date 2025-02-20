const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5001
require("dotenv").config(); 
const adminRoute = require('./routes/admin.route.js')
const cors=require("cors");

app.use(express.json())
app.use(cors({
  origin: true,
  credentials: true,
}));

// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/admin",adminRoute);

// used to generate JWT superkey
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey);

// db connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("DB connected")
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
.catch(() => {
  console.log("DB connection failed")
}) 