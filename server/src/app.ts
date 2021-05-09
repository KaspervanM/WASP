import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const port: number = 3000;

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
    case "string":
    case "array":
      return new Array(end - start + 1).fill(0);
  }
  return undefined;
}

function resultHandler(
  id: string,
  subResult: string | number | Array<string | number>,
  index: number
): boolean {
  const config = tasks[id].config;
  switch (config["RESULT"]) {
    case "sum":
      (tasks[id].result as number) += subResult as number;
      return true;
    case "string":
    case "array":
      const batch_size: number = config["BATCH_SIZE"];
      const iterationIndex: number = index * batch_size;
      for (let i = iterationIndex; i < iterationIndex + batch_size; i++) {
        if (i <= config["END"] - config["START"])
          (tasks[id].result as Array<string | number>)[i] =
            subResult[i - iterationIndex];
      }
      return true;
  }
  return false;
}

function getProgress(id: string): TaskProgress {
  const subTasksWithStatus2: number = tasks[id].subtasks.filter(
    (obj) => obj.status === 2
  ).length;
  const totalSubTasks: number = tasks[id].subtasks.length;
  return {
    value: subTasksWithStatus2,
    max: totalSubTasks
  };
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

/* Read all tasks */
app.get("/task", (req, res) => {
  if (Object.values(tasks).length)
    return res.status(200).send(Object.values(tasks)); // OK
  return res.sendStatus(404); // Not Found
});

/* Read specific task */
app.get("/task/:id", (req, res) => {
  if (!tasks[req.params.id]) return res.sendStatus(404); // Not Found
  return res.status(200).send(tasks[req.params.id]); // OK
});

/* Request a subtask */
app.get("/task/request-subtask/:id", (req, res) => {
  const id: string = req.params.id;
  if (!tasks[id]) return res.sendStatus(404); // Not Found
  const index: number = tasks[id].subtasks.findIndex((obj) => obj.status === 0);
  if (index === -1) return res.sendStatus(406); // Not Acceptable
  tasks[id].subtasks[index].status = 1;
  const before: number = getProgress(id).value;
  const speedRefreshDuration: number = 1000;
  setTimeout(() => {
    const after: number = getProgress(id).value;
    const speed: number = ((after - before) / speedRefreshDuration) * 1000; // Calculate the speed at wich iterations are being handed in
    tasks[id].speed = speed;
  }, speedRefreshDuration);
  setTimeout(() => {
    // Reset status if task is not handed in in time
    if (tasks[id].subtasks[index].status != 2)
      tasks[id].subtasks[index].status = 0;
  }, TIMEOUT_DURATION);

  return res.status(200).send([tasks[id].subtasks[index], tasks[id].code]); // OK
});

/* Hand in result of subtask */
app.post("/task/return-subresult", (req, res) => {
  if (
    !(
      req.body.id &&
      typeof req.body.subtask.start === "number" &&
      typeof req.body.subtask.end === "number" &&
      req.body.result
    )
  )
    return res.sendStatus(400); // Bad Request
  const id: string = req.body.id;
  if (!tasks[id]) return res.sendStatus(404); // Not Found
  const index: number = tasks[id].subtasks.findIndex(
    (obj) => obj.start === req.body.subtask.start
  );
  if (index === -1) return res.sendStatus(406); // Not Acceptable
  const subtask: SubTask = tasks[id].subtasks[index];
  if (subtask["end"] !== req.body.subtask.end || subtask.status !== 1)
    return res.sendStatus(406); // Not acceptable
  if (!resultHandler(id, req.body.result, index)) return res.sendStatus(500); // Internal Server Error
  subtask.status = 2;
  return res.sendStatus(200); // OK
});

/* Get task progress */
app.get("/task/progress/:id", (req, res) => {
  const id: string = req.params.id;
  if (!tasks[id]) return res.sendStatus(404); // Not Found
  const timeLeft =
    tasks[id].subtasks.filter((obj) => obj.status !== 2).length /
    tasks[id].speed;
  return res.status(200).send([getProgress(id), timeLeft]); // OK
});

/* Add task */
app.post("/task", (req, res) => {
  if (
    !(
      req.body.title &&
      req.body.description &&
      req.body.config &&
      req.body.code
    )
  )
    return res.sendStatus(400); // Bad Request
  const config = JSON.parse(req.body.config);
  const id: string = uuidv4();
  tasks[id] = {
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
  return res.status(200).send(id); // OK
});

/* Update task */
app.put("/task", (req, res) => {
  const task: Task = req.body.task;
  if (!(task.id && task.title && task.description && task.config && task.code))
    return res.sendStatus(400); // Bad Request
  if (!tasks[task.id]) return res.sendStatus(404); // Not Found
  console.log(task);
  console.log(task.config);
  console.log(task.config.toString());
  const config = JSON.parse(task.config.toString());
  const upTask: Task = {
    id: task.id,
    title: task.title,
    description: task.description,
    config: config,
    code: req.body.code,
    subtasks: req.body.reset
      ? createSubtasks(config["START"], config["END"], config["BATCH_SIZE"])
      : tasks[task.id]["subtasks"],
    result: req.body.reset
      ? createResults(config["RESULT"], config["START"], config["END"])
      : tasks[task.id]["result"],
    speed: 0
  };
  tasks[task.id] = upTask;
  return res.sendStatus(201); // OK
});

/* Delete task */
app.delete("/task/:id", (req, res) => {
  const id: string = req.params.id;
  if (!tasks[id]) return res.sendStatus(404); // Not Found
  const delTask: Task = tasks[id];
  delete tasks[id];
  return res.status(200).send(delTask); // OK
});

/* Start the server */
app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
