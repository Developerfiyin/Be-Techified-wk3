require("dotenv").config() //Loads env //LOADS ENV

const express = require('express')
const app = express()
const port = process.env.PORT ;// MOVED PORT TO DOTENV

app.use(express.json())

app.post('/user', (req, res) => {
  console.log("req.body ")
  res.json({echoed: req.body });   // REQ.BODY IS NOW AVAILABLE
});

app.get('/', (req, res) => {
  res.send('Hello everybody gerge!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
