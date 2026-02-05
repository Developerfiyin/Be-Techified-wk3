require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { logRequest } = require('./middlewares/logger.js');
const validateTodo = require('./middlewares/validation.js'); 
const validateTodoPatch = require('./middlewares/Validate-update.js'); 
const errorHandler = require('./middlewares/global-handler.js');
const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(logRequest)
const corsOptions = { 
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
  // some legacy browsers ()


app.use(cors(corsOptions));




// READ ALL TODOS (with optional query filter)
app.get('/todos', async (req, res, next) => {
  try {
    const {completed} = req.query; // read query true/false
    let filter = {};
    if (completed !== undefined) {
      // convert string to boolean
      filter.completed = completed === 'true';
    }
  const todos = await Todo.find(filter); // all todos
  res.status(200).json(todos);
} catch (error) {
  next(error);
}
});

// TASK 3: READ ACTIVE (Completed) TODOS
app.get('/todos/completed', async (req, res, next) => {
  try {
  const completed = await Todo.find({ completed: true });
  res.status(200).json(completed); //Custom read
} catch (error) {
  next(error);
}
});

// TASK 1: READ SINGLE TODO
app.get('/todos/:id', async (req, res, next) => {
  try {
  const todo = await Todo.findById(req.params.id); //By ID from MongoDB
  if (!todo) { return res.status(404).json({ error: 'Not found' });
  }
  res.status(200).json(todo);
} catch (error) {
  next(error);
}
});

// TASK 2: CREATE TODO (VALIDATION)
app.post('/todos', validateTodo, async (req, res, next) => {
  try { 
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    next(err);
} // week 7 error handling 

});

// UPDATE (Patch) TODO
app.patch('/todos/:id', validateTodoPatch, async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});


// DELETE TODO
app.delete('/todos/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
  
    res.status(200).json({ message: `Todo ${req.params.id} deleted` });

  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

// START SERVER
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
