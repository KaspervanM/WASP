import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { sha512 } from "js-sha512";
import fs from "fs";
import readline from "readline";

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

interface Subtask {
  start: number;
  end: number;
  status: number;
}

interface Config {
  START: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  PUBLIC_RESULT: boolean;
  ALLOW_ANONYMOUS_USERS?: boolean;
}

interface Task {
  id: string;
  password: string;
  title: string;
  description: string;
  config: Config | string;
  code: string;
  subtasks: Subtask[];
  result: number | string | Array<string | number>;
  speed: number;
}
type TaskList = { [id: string]: Task };

let tasks: TaskList = {};

const help: string = `
HELP              Shows this help screen.
EXPORT <FILEPATH> Exports the tasklist to the specified file. (JSON)
IMPORT <FILEPATH> Imports the tasklist from the specified file. (JSON)
CTRL + C          Stops the server.
`;
const typeHelp: string = " Type 'help' to get more information.";

function cmdLoop(): void {
  const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "WASP> "
  });
  r.prompt();
  r.on("line", async (cmd: string): Promise<void> => {
    const cmdArgs: Array<string> = cmd.trim().split(" ");
    switch (cmdArgs[0].toLowerCase()) {
      case "export":
        if (!cmdArgs[1]) {
          console.error("Please specify the output file path." + typeHelp);
          break;
        }
        if (/[<>:"|?*]/i.test(cmdArgs[1])) {
          console.error(
            "A filepath can't contain any of the following characters:\n: * ? \" < > | "
          );
          break;
        }
        const data: string = JSON.stringify(tasks);
        await fs.promises
          .writeFile(cmdArgs[1], data, "utf8")
          .then((): void => {
            console.log("Tasks exported successfully!");
          })
          .catch((err: NodeJS.ErrnoException): void => {
            console.error(err);
          });
        break;
      case "import":
        if (!cmdArgs[1]) {
          console.error("Please specify the input file path." + typeHelp);
          break;
        }
        if (/[<>:"|?*]/i.test(cmdArgs[1])) {
          console.error(
            "A filepath can't contain any of the following characters:\n: * ? \" < > | "
          );
          break;
        }
        await fs.promises
          .readFile(cmdArgs[1], "utf8")
          .then((data: string): void => {
            const importedTasks: TaskList = JSON.parse(data);
            if (!importedTasks) {
              console.error("Error: The imported file is invalid!");
              return;
            }
            tasks = { ...tasks, ...importedTasks };
            console.log("Tasks imported successfully!");
          })
          .catch((err: NodeJS.ErrnoException): void => {
            console.error(err);
          });
        break;
      case "help":
        console.log(help);
        break;
      case "":
        break;
      default:
        console.log("Unknown command '" + cmd + "'." + typeHelp);
    }
    r.prompt();
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0);
  });
}

function createSubtasks(
  start: number,
  end: number,
  batch_size: number
): Subtask[] {
  let subtasks: Subtask[] = [];
  for (let i = 0; i < Math.ceil((end - start + 1) / batch_size); i++) {
    subtasks.push({
      start: start + ((i > 0) as unknown as number) * i * batch_size,
      end: Math.min(
        start +
          ((i > 0) as unknown as number) * i * batch_size +
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
): number | string | Array<number | string> {
  switch (res) {
    case "sum":
      return 0;
    case "bigsum":
      return "0";
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
      switch (typeof subResult) {
        case "number":
          (tasks[id].result as number) += subResult as number;
          break;
        case "string":
          (tasks[id].result as number) += parseFloat(subResult);
          break;
      }
      return true;
    case "bigsum":
      (tasks[id].result as any as string) = (
        BigInt(tasks[id].result as any as string) +
        BigInt(subResult as any as string)
      ).toString();
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
  const totalSubtasks: number = tasks[id].subtasks.length;
  return {
    value: subTasksWithStatus2,
    max: totalSubtasks
  };
}

tasks["123e4567-e89b-12d3-a456-426614174000"] = {
  //Default task
  id: "123e4567-e89b-12d3-a456-426614174000",
  password: sha512("password"),
  title: "Default Task",
  description: "Congratulations! WASP is working correctly.",
  config: {
    START: 0,
    END: 30000,
    BATCH_SIZE: 4,
    RESULT: "array",
    PUBLIC_RESULT: false
  },
  code: 'function main(start, end) {\n\tlet str = "Congratulations! WASP is working correctly. Numbers:";\n\tlet arr = [];\n\tfor (let i = start; i <= end; i++) {\n\t\tarr.push(str + " " + i.toString());\n\t}\n\t\treturn arr;\n}\n',
  subtasks: createSubtasks(0, 30000, 4),
  result: createResults("array", 0, 30000),
  speed: 0
};

const TIMEOUT_DURATION: number = 5000;

/* Get an array of tasks */
app.get("/task", (req, res) => {
  if (Object.values(tasks).length)
    return res.status(200).send(Object.values(tasks)); // OK
  return res.sendStatus(404); // Not Found
});

/* Get information about specific task */
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
  ) {
    return res.sendStatus(400); // Bad Request
  }
  const id: string = req.body.id;
  if (!tasks[id]) return res.sendStatus(404); // Not Found
  const index: number = tasks[id].subtasks.findIndex(
    (obj) => obj.start === req.body.subtask.start
  );
  if (index === -1) return res.sendStatus(409); // Conflict
  const subtask: Subtask = tasks[id].subtasks[index];
  if (subtask["end"] !== req.body.subtask.end || subtask.status !== 1)
    return res.sendStatus(409); // Conflict
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
      req.body.password &&
      req.body.title &&
      req.body.description &&
      req.body.config &&
      req.body.code
    )
  ) {
    return res.sendStatus(400); // Bad Request
  }
  const config = JSON.parse(req.body.config);
  const id: string = uuidv4();
  tasks[id] = {
    id,
    password: sha512(req.body.password),
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

/* Get the results of a task */
app.post("/task/results", (req, res) => {
  if (!req.body.id) {
    return res.sendStatus(400); // Bad Request
  }
  const id: string = req.body.id;
  if (!tasks[id]) {
    return res.sendStatus(404); // Not Found
  }
  const password: string = req.body.password;
  if (!password) {
    return res.sendStatus(401); // Unauthorized
  }
  if (!tasks[id].config["PUBLIC_RESULT"])
    if (tasks[id].password != sha512(password)) {
      return res.sendStatus(403); //Forbidden
    }
  return res.send([tasks[id].result]);
});

/* Update task */
app.put("/task", (req, res) => {
  const task: Task = req.body.task;
  if (!(task.id && task.title && task.description && task.config && task.code))
    return res.sendStatus(400); // Bad Request
  if (!tasks[task.id]) {
    return res.sendStatus(404); // Not Found
  }
  if (!task.password) {
    return res.sendStatus(401); // Unauthorized
  }
  if (!tasks[task.id].config["PUBLIC_RESULT"])
    if (tasks[task.id].password != sha512(task.password)) {
      return res.sendStatus(403); //Forbidden
    }
  console.log(task);
  console.log(task.config);
  console.log(task.config.toString());
  const config = JSON.parse(task.config.toString());
  const upTask: Task = {
    id: task.id,
    password: sha512(req.body.password),
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
  return res.sendStatus(201); // Created
});

/* Delete task */
app.delete("/task", (req, res) => {
  if (!(req.body.id && req.body.password)) {
    return res.sendStatus(400); // Bad Request
  }
  const id: string = req.body.id;
  if (!tasks[id]) {
    return res.sendStatus(404); // Not Found
  }
  const password: string = req.body.password;
  if (!password) {
    return res.sendStatus(401); // Unauthorized
  }
  if (!tasks[id].config["PUBLIC_RESULT"])
    if (tasks[id].password != sha512(password)) {
      return res.sendStatus(403); //Forbidden
    }
  delete tasks[id];
  return res.sendStatus(204); // No Content
});

/* Start the server */
app.listen(port, (): void => {
  console.log(`Server is listening on ${port}`);
  cmdLoop();
});
