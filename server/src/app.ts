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

interface SubTask {
  start: number;
  end: number;
  status: number;
}

interface Config {
  BEGIN: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  ALLOW_ANONYMOUS_USERS?: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  config: Config | string;
  code: string;
  subtasks: SubTask[];
  result: number | Array<string | number>;
}
type TaskList = { [id: string]: Task };

let tasks: TaskList = {};

function createSubtasks(
  start: number,
  end: number,
  batch_size: number
): SubTask[] {
  let subtasks: SubTask[] = [];
  for (let i = 0; i < Math.ceil((end - start + 1) / batch_size); i++) {
    subtasks.push({
      start: start + (((i > 0) as unknown) as number) * i * batch_size,
      end: Math.min(
        start +
          (((i > 0) as unknown) as number) * i * batch_size +
          batch_size -
          1,
        end
      ),
      status: 0
    });
  }
  console.log(subtasks);
  return subtasks;
}
function createResults(res: string): number | Array<number | string> {
  switch (res) {
    case "sum":
      return 0;
      break;
    case "string":
    case "array":
      return [];
      break;
    default:
      return undefined;
  }
}

tasks["123e4567-e89b-12d3-a456-426614174000"] = {
  //Default task
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Default Task",
  description: "Congratulations! WASP is working correctly.",
  config: {
    BEGIN: 0,
    END: 10,
    BATCH_SIZE: 3,
    RESULT: "array"
  },
  code:
    'function main(begin, end) {\n\treturn (() => {\n\t\tlet concStr = "Congratulations! WASP is working correctly. Numbers:";\n\t\tfor (let i = begin; i <= end; i++) {\n\t\t\tconcStr += " " + i.toString();\n\t\t}\n\t\treturn concStr;\n\t})();\n}\n',
  subtasks: createSubtasks(0, 10, 3),
  result: createResults("array")
};

const TIMEOUT_DURATION: number = 5000;

app.get("/task", (req, res) => {
  return res.send(Object.values(tasks));
}); //Read all tasks (JSON: response contains id, title, description and code)

app.get("/task/:id", (req, res) => {
  return res.send(tasks[req.params.id]);
}); //Read one task (URL: request contains id, JSON: response contains id, title, description and code)

app.get("/task/request-subtask/:id", (req, res) => {
  const index = tasks[req.params.id].subtasks.findIndex(
    (obj) => obj.status === 0
  );
  if (index === -1) {
    return res.send([<SubTask>{}, ""]);
  }
  tasks[req.params.id].subtasks[index].status = 1;
  setTimeout(() => {
    if (tasks[req.params.id].subtasks[index].status != 2)
      tasks[req.params.id].subtasks[index].status = 0;
  }, TIMEOUT_DURATION);

  return res.send([
    tasks[req.params.id].subtasks[index],
    tasks[req.params.id].code
  ]);
});

app.post("/task/return-subresult", (req, res) => {
  const index = tasks[req.body.id].subtasks.findIndex(
    (obj) => obj.start === req.body.subtask.start
  );
  if (index === -1) {
    return res.send(false);
  }
  const subtask: SubTask = tasks[req.body.id].subtasks[index];
  if (subtask["end"] !== req.body.subtask.end) {
    return res.send(false);
  }
  subtask.status = 2;
  return res.send(true);
});

app.get("/task/progress/:id", (req, res) => {
  const taskProgress: TaskProgress = {
    value: Math.random() * 100,
    max: 100
  };
  return res.send(taskProgress);
});

app.post("/task", (req, res) => {
  if (
    req.body.title &&
    req.body.description &&
    req.body.config &&
    req.body.code
  ) {
    const config = JSON.parse(req.body.config);
    const id = uuidv4();
    const newTask: Task = {
      id,
      title: req.body.title,
      description: req.body.description,
      config: config,
      code: req.body.code,
      subtasks: createSubtasks(
        config["BEGIN"],
        config["END"],
        config["BATCH_SIZE"]
      ),
      result: createResults(config["RESULT"])
    };
    tasks[id] = newTask;

    return res.send(newTask);
  }
  const errmsg: string = "Bad request";
  console.error(errmsg);
  return res.status(400).send(errmsg).end();
}); //Add one task (JSON: request contains title, description and code, response contains id, title, description and code)

app.put("/task", (req, res) => {
  if (
    req.body.task.title &&
    req.body.task.description &&
    req.body.task.config &&
    req.body.task.code &&
    req.body.task.id in tasks
  ) {
    const upTask: Task = {
      id: req.body.task.id,
      title: req.body.task.title,
      description: req.body.task.description,
      config: req.body.task.config,
      code: req.body.code,
      subtasks: req.body.reset
        ? createSubtasks(
            req.body.task.config["BEGIN"],
            req.body.task.config["END"],
            req.body.task.config["BATCH_SIZE"]
          )
        : tasks[req.body.task.id]["subtasks"],
      result: req.body.reset
        ? createResults(req.body.task.config["RESULT"])
        : tasks[req.body.task.id]["result"]
    };

    tasks[req.body.task.id] = upTask;

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
