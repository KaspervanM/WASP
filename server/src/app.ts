import express from "express";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = {
  1: {
    id: '1',
    title: 'Very important task n.1',
    description: 'Description of task n.1',
  },
  2: {
    id: '2',
    title: 'Very important task n.2',
    description: 'Description of task n.2',
  },
};

app.get('/task', (req, res) => {
  return res.send(Object.values(tasks));
}); //Read all tasks
 
app.get('/task/:tId', (req, res) => {
  return res.send(tasks[req.params.tId]);
}); //Read one task

app.post('/task', (req, res) => {
  const id = uuidv4();
  const task = {
    id,
    title: req.body.title,
    description: req.body.description,
  };
 
  tasks[id] = task;
 
  return res.send(task);
}); //Add one task
 
app.put('/task/:tId', (req, res) => {
  return res.send(`PUT HTTP method on task/${req.params.tId} resource`,);
}); //Update one task
 
app.delete('/task/:tId', (req, res) => {
  return res.send(`DELETE HTTP method on task/${req.params.tId} resource`,);
}); //Delete one task

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});