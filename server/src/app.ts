import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;
const cors = require("cors");

var corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsOptions));

interface TaskProgress {
  value: number;
  max: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
}

let tasks: { [id: string]: Task } = {};

tasks["123e4567-e89b-12d3-a456-426614174000"] = {
  //Default task
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Default Task",
  description: "Congratulations! WASP is working correctly.",
  code:
    'function test() {\n\treturn "Congratulations! WASP is working correctly.";\n}\ntest();\n'
};

app.get("/task", (req, res) => {
  return res.send(Object.values(tasks));
}); //Read all tasks (JSON: response contains id, title, description and code)

app.get("/task/:id", (req, res) => {
  return res.send(tasks[req.params.id]);
}); //Read one task (URL: request contains id, JSON: response contains id, title, description and code)

app.get("/task/progress/:id", (req, res) => {
  const taskProgress: TaskProgress = {
    value: Math.random() * 100,
    max: 100
  };
  return res.send(taskProgress);
});

app.post("/task", (req, res) => {
  if (req.body.title && req.body.description && req.body.code) {
    const id = uuidv4();
    const newTask: Task = {
      id,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code
    };
    tasks[id] = newTask;

    return res.send(newTask);
  }
  const errmsg: string = "Bad request";
  console.error(errmsg);
  return res.status(400).send(errmsg).end();
}); //Add one task (JSON: request contains title, description and code, response contains id, title, description and code)

app.put("/task", (req, res) => {
  if (req.body.title && req.body.description && req.body.code && req.body.id in tasks) {
    const upTask: Task = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code
    };

    tasks[req.body.id] = upTask;

    return res.send(upTask);
  }
  const errmsg: string = "Bad request";
  console.error(errmsg);
  return res.status(400).send(errmsg).end();
}); //Update one task (JSON: request contains id, title, description and code, response contains id, title, description and code)

app.delete("/task/:id", (req, res) => {
  const delTask: Task = tasks[req.params.id];
  delete tasks[req.params.id];
  return res.send(delTask);
}); //Delete one task (URL: request contains id, JSON: response contains id, title, description and code)

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
