require("dotenv").config();


const express = require('express')
const app = express();
const port = process.env.PORT

app.use(express.json()) // ADDED EXPRESS MIDDLEWARE WHICH IS EXPRESS.JSON

app.post('/user', (req, res) => {
  console.log("req.body ")
  res.json({echoed: req.body});   // REQ.BODY IS NOW AVAILABLE
});

app.get('/hello', (req, res) => {
  res.send('Hello Fiyinfoluwa, I am worried that my code aint working!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

