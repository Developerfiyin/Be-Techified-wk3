require("dotenv").config; //LOADS ENV

const express = require('express')
const app = express()
const port = process.env.config() // MOVED PORT TO DOTENV

app.get('/', (req, res) => {
  res.send('Hello everybody!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
