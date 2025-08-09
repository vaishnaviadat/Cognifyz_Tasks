const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, title: "Learn JavaScript", completed: false },
    { id: 2, title: "Build a REST API", completed: true }
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// CREATE a new task
app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.json(newTask);
});

// UPDATE a task
app.put("/api/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.title = req.body.title || task.title;
        task.completed = req.body.completed ?? task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// DELETE a task
app.delete("/api/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Task deleted" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
