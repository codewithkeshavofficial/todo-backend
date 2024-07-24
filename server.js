const express = require('express');
const cors  = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// In-memory data storage
const tasks = [];
let currentId = 1;

// Helper function to find task by ID
const findTaskById = (id) => tasks.find(task => task.id === parseInt(id));

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    if(tasks.length === 0){
        res.status(201).send({success: true, message: "No Tasks Found"});
    } else {
        res.json(tasks);
    }
  
});

// GET /tasks/:id - Retrieve a single task by ID
app.get('/tasks/:id', (req, res) => {
  const task = findTaskById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const newTask = {
    id: currentId++,
    title,
    description,
    status,
    dueDate
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
  const task = findTaskById(req.params.id);
  if (task) {
    const { title, description, status, dueDate } = req.body;
    task.title = title;
    task.description = description;
    task.status = status;
    task.dueDate = dueDate;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// DELETE /tasks/:id - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
