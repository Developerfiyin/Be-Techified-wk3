require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/hello', (req, res) => {
  res.send('Hello Fiyinfoluwa! I AM WORRIED ')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
