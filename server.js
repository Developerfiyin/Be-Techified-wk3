require("dotenv").config();


const express = require('express')
const app = express();
const port = process.env.PORT

app.use(express.json()) // ADDED EXPRESS MIDDLEWARE WHICH IS EXPRESS.JSON

app.post('/user', (req, res) => {
  console.log("req.body ")
  res.json({echoed: req.body});   // REQ.BODY IS NOW AVAILABLE
});

let todos = [
  { id: crypto.randomUUID(), name : "peace" , task : "Build CRUDE Api", user : "Ss1" , complete : false},
  { id: crypto.randomUUID(), name : "fiyin", user : "SS2", complete: false }
] // ADDED OBJECT TO ARRAYS
app.get('/todos', (req, res) => {
  res.send('Hello Fiyinfoluwa, I am worried that my code is not working!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

