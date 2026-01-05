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

app.get('/hello', (req, res) => {
  res.send('Hello Fiyinfoluwa, I am worried that my code is not working!')
});


app.get('/todos' , (req, res) => {
  res.send(200).json(todos) //Sends Array as Object
});

app.post('/todos', (req, res) => {
  const NewTodos = {id : todos.length + 1 , ...req.body }
  todos.push;
  res.send(201).json(NewTodos);
});

//PATCH Update -partial
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find( (t) => t.id === parseInt(req.params.id));
  if(!todo) return res.status(404).json({message : "Todo Not Found"})
    Object.assign(todo, req.body); // SUCESSFULLY MERGE
  res.status(200).json(todo);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

