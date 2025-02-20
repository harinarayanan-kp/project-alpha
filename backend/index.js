const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4000
require("dotenv").config(); 

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Worl!')
})

// used to generate JWT superkey
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey);


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