 require("dotenv").config() //Loads env
 
 const express = require('express')
const app = express()
const port = process.env.PORT;

app.use(express.json()); // ADDED EXPRESS MIDDLEWARE WHICH IS EXPRESS.JSON

app.post('/users', (req, res) => {
  console.log("req.body ")
  res.json({echoed: req.body });   // REQ.BODY IS NOW AVAILABLE
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  res.send(id)
});

app.get('/y', (req, res) => {
  res.send('The assignment says WEEK TWO API!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})