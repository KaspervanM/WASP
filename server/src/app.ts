import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(express.json());

interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
}

let tasks: { [id: string]: Task } = {};

tasks["1default-task-uuid-wasp-twelvecharss"] = {
  //Default task
  id: "1default-task-uuid-wasp-twelvecharss",
  title: "Default Task",
  description: "Congratulations! WASP is working correctly.",
  code: 'alert("Congratulations! WASP is working correctly.");'
};

app.get("/task", (req, res) => {
  return res.send(Object.values(tasks));
}); //Read all tasks (JSON: response contains id, title, description and code)

app.get("/task/:id", (req, res) => {
  return res.send(tasks[req.params.id]);
}); //Read one task (URL: request contains id, JSON: response contains id, title, description and code)

app.post("/task", (req, res) => {
  const id = uuidv4();
  const newTask: Task = {
    id,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code
  };

  tasks[id] = newTask;

  return res.send(newTask);
}); //Add one task (JSON: request contains title, description and code, response contains id, title, description and code)

app.put("/task", (req, res) => {
  const upTask: Task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code
  };

  tasks[req.body.id] = upTask;

  return res.send(upTask);
}); //Update one task (JSON: request contains id, title, description and code, response contains id, title, description and code)

app.delete("/task/:id", (req, res) => {
  const delTask: Task = tasks[req.params.id];
  delete tasks[req.params.id];
  return res.send(delTask);
}); //Delete one task (URL: request contains id, JSON: response contains id, title, description and code)

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
