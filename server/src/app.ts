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
  START: number;
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
  speed: number;
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
  return subtasks;
}
function createResults(
  res: string,
  start?: number,
  end?: number
): number | Array<number | string> {
  switch (res) {
    case "sum":
      return 0;
      break;
    case "string":
    case "array":
      return new Array(end - start + 1).fill(0);
      break;
    default:
      return undefined;
  }
}

function resultHandler(
  taskId: string,
  subResult: string | number | Array<string | number>,
  index: number
): boolean {
  const config = tasks[taskId].config;
  switch (config["RESULT"]) {
    case "sum":
      (tasks[taskId].result as number) += subResult as number;
      return true;
    case "string":
    case "array":
      const batch_size = config["BATCH_SIZE"];
      const iterationIndex = index * batch_size;
      for (let i = iterationIndex; i < iterationIndex + batch_size; i++) {
        if (i <= config["END"] - config["START"])
          (tasks[taskId].result as Array<string | number>)[i] =
            subResult[i - iterationIndex];
      }
      return true;
  }
  return false;
}

tasks["123e4567-e89b-12d3-a456-426614174000"] = {
  //Default task
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Default Task",
  description: "Congratulations! WASP is working correctly.",
  config: {
    START: 0,
    END: 30000,
    BATCH_SIZE: 4,
    RESULT: "array"
  },
  code:
    'function main(start, end) {\n\treturn (() => {\n\t\tlet str = "Congratulations! WASP is working correctly. Numbers:";\n\t\tlet arr = []\n\t\tfor (let i = start; i <= end; i++) {\n\t\t\tarr.push(str + " " + i.toString());\n\t\t}\n\t\treturn arr;\n\t})();\n}\n',
  subtasks: createSubtasks(0, 30000, 4),
  result: createResults("array", 0, 30000),
  speed: 0
};

const TIMEOUT_DURATION: number = 5000;

app.get("/task", (req, res) => {
  return res.send(Object.values(tasks));
}); //Read all tasks (JSON: response contains id, title, description and code)

app.get("/task/:id", (req, res) => {
  return res.send(tasks[req.params.id]);
}); //Read one task (URL: request contains id, JSON: response contains id, title, description and code)

app.get("/task/request-subtask/:id", (req, res) => {
  const id = req.params.id;
  const index = tasks[id].subtasks.findIndex((obj) => obj.status === 0);
  if (index === -1) {
    return res.send([<SubTask>{}, ""]);
  }
  tasks[id].subtasks[index].status = 1;
  const before = getProgress(id).value;
  const speedRefreshDuration = 1000;
  setTimeout(() => {
    const after = getProgress(id).value;
    const speed = ((after - before) / speedRefreshDuration) * 1000; // Calculate the speed at wich iterations are being handed in
    tasks[id].speed = speed;
  }, speedRefreshDuration);
  setTimeout(() => {
    // Reset status if task is not handed in in time
    if (tasks[id].subtasks[index].status != 2)
      tasks[id].subtasks[index].status = 0;
  }, TIMEOUT_DURATION);

  return res.send([tasks[id].subtasks[index], tasks[id].code]);
});

app.post("/task/return-subresult", (req, res) => {
  const index = tasks[req.body.id].subtasks.findIndex(
    (obj) => obj.start === req.body.subtask.start
  );
  if (index === -1) {
    return res.send(false);
  }
  const subtask: SubTask = tasks[req.body.id].subtasks[index];
  if (
    subtask["end"] !== req.body.subtask.end ||
    subtask.status !== 1 ||
    !resultHandler(req.body.id, req.body.result, index)
  ) {
    return res.send(false);
  }
  subtask.status = 2;
  return res.send(true);
});

function getProgress(id: string) {
  const subTasksWithStatus2: number = tasks[id].subtasks.filter(
    (obj) => obj.status === 2
  ).length;
  const totalSubTasks: number = tasks[id].subtasks.length;
  const taskProgress: TaskProgress = {
    value: subTasksWithStatus2,
    max: totalSubTasks
  };
  return taskProgress;
}

app.get("/task/progress/:id", (req, res) => {
  const id = req.params.id;
  const timeLeft =
    tasks[id].subtasks.filter((obj) => obj.status !== 2).length /
    tasks[id].speed;
  return res.send([getProgress(id), timeLeft]);
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
        config["START"],
        config["END"],
        config["BATCH_SIZE"]
      ),
      result: createResults(config["RESULT"], config["START"], config["END"]),
      speed: 0
    };
    tasks[id] = newTask;
    return res.send(newTask);
  }
  const errmsg: string = "Bad request";
  console.error(errmsg);
  return res.status(400).send(errmsg).end();
}); //Add one task (JSON: request contains title, description and code, response contains id, title, description and code)

app.get("/task/results/:id", (req, res) => {
  const id = req.params.id;
  return res.send([tasks[id].result]);
});

app.put("/task", (req, res) => {
  if (
    req.body.task.title &&
    req.body.task.description &&
    req.body.task.config &&
    req.body.task.code &&
    req.body.task.id in tasks
  ) {
    const config = JSON.parse(req.body.task.config);
    const upTask: Task = {
      id: req.body.task.id,
      title: req.body.task.title,
      description: req.body.task.description,
      config: config,
      code: req.body.code,
      subtasks: req.body.reset
        ? createSubtasks(config["START"], config["END"], config["BATCH_SIZE"])
        : tasks[req.body.task.id]["subtasks"],
      result: req.body.reset
        ? createResults(config["RESULT"], config["START"], config["END"])
        : tasks[req.body.task.id]["result"],
      speed: 0
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
