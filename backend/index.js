const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb+srv://teamdaash:123daash123@backenddb.2grsm.mongodb.net/')
.then(() => {
  console.log("DB connected")
})