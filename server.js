const cors = require('cors')
const logRequest = require('./logger.js ')
require("dotenv").config();
const corsOption = {
  origin: []
  //Some legacy browers (IELL) choke on 204
}

const express = require('express')
const app = express();
const port = process.env.PORT // 3000 PORT ALTERNATIVE

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors(corsOption))
app.use(express.json()) // ADDED EXPRESS MIDDLEWARE WHICH IS EXPRESS.JSON
app.use(logRequest)
app.post('/user', (req, res) => {
  console.log("req.body ")
  res.json({echoed: req.body});   // REQ.BODY IS NOW AVAILABLE
});


// IN-MEMORY DATA STORE (Created a fake database using array of objects)
let todos = [
  { id: crypto.randomUUID(), name : "peace" , task : "Build CRUDE Api", user : "Ss1" , complete : false},
  { id: crypto.randomUUID(), name : "fiyin", task: "LEARN NODE" ,  user : "SS2", complete: false }
]; // ADDED OBJECT TO ARRAYS

app.get('/hello', (req, res) => {
  res.status('Hello Fiyinfoluwa, I am worried that my code is not working!')
});  //GET REQUEST PATH

//GET REQUEST - READ

app.get('/todos' , (req, res) => {
  res.status(200).json(todos) //Sends Array as Object
});

app.post('/todos', (req, res) => {
  const NewTodos = {id : todos.length + 1 , ...req.body }
  todos.push;
  res.status(201).json(NewTodos);
});  //POST REQUEST

//PATCH Update - partial
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if(!todo) return res.status(404).json({message : "Todo Not Found"})
    Object.assign(todo, req.body); // SUCESSFULLY MERGE TODOS
  res.status(200).json(todo);
});

//DELETE CRUDE API
app.delete('todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id)//ARRAY.FILTER - NON-DESTRUCRTIVE
if(todos.length === initialLength )
return  res.status(404).json({Error : 'not Found'})
res.status(204).send();
}); // SUCCESSFULLY DELETED!

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});  //PORT HIDDEN SAFELY

