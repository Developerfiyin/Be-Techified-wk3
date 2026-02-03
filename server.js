const cors = require('cors');
const { parse } = require('dotenv');
//const logRequest = require('./logger.js ')
require("dotenv").config();
const corsOption = {
  origin: []
  //Some legacy browers (IELL) choke on 204
}


 {/*32843 phone password 
 12345677 wifi password
 
 
 const logRequest = (req, res, next) => {
 const timeStamp = new Date().toISOString()
console.log(`${timeStamp} - ${req.method} - ${req.url} from ${req.ip}`);
next()

};
module.exports = logRequest;
 
 */}

const express = require('express')
const app = express();
const port = process.env.PORT // 3000 PORT ALTERNATIVE

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors(corsOption))
app.use(express.json()) // ADDED EXPRESS MIDDLEWARE WHICH IS EXPRESS.JSON
//app.use(logRequest)
app.post('/user', (req, res) => {
  console.log("req.body ")
  res.json({echoed: req.body});   // REQ.BODY IS NOW AVAILABLE
});


// IN-MEMORY DATA STORE (Created a fake database using array of objects)
let todos = [
  { id: crypto.randomUUID(), task : "Build CRUDE Api", user : "Ss1" , complete : false},
  { id: crypto.randomUUID(),  task: "LEARN NODE" ,  user : "SS2", complete: false },
  {id: crypto.randomUUID(), task: 'Sumbit assignment', user: 'ss3', complete:false}
]; // ADDED OBJECT TO ARRAYS

app.get('/hello', (req, res) => {
  res.status('Hello Fiyinfoluwa, I am worried that my code is not working!')
});  //GET REQUEST PATH



//GET REQUEST FOR ID ONE Assignment for week 3 (1 of 3)
app.get('/todos/:id' ,  (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((t) => {
    return t.id === todoId
  })
  res.status(200).json(todo )
})

//  VALIDATE POST FOR ID TWO Assignment for week 3 (2 of 3)

app.post('/todos', (req, res) => {
  const { task, user, complete } = req.body;
  if (!task || !user || complete === undefined) {
    return res.status(400).json({ error: 'Missing required fields: task, user, complete' });
  }
  const newTodos = {id : todos.length + 1 , ...req.body }
  todos.push(newTodos);
  res.status(201).json(newTodos);
});  //POST REQUEST

//GET REQUEST FOR ALL TODOS Assignment for week 3 (3 of 3)

app.post('/todos/completed', (req, res) => {
  const completed  = todos.filter((t) => {
    return t.completed === true;
  })
  res.status(200).json(completed);
}); 

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

