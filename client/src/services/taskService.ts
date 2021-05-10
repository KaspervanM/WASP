// client/src/services/taskService.ts
// How to use:
// Import the taskService:
//   import taskService from "@/services/taskService";
// Access functions:
//   taskService.getTask();

import axios, { AxiosError, AxiosResponse } from "axios";

const serverURL = "http://localhost:3000/";

interface SubTask {
  start: number;
  end: number;
  finished: boolean;
}
type exSubTask = [SubTask, string];

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
type TaskList = { [id: string]: Task };

/* Convert errors into a developer-friendly string*/
function errToString(err: Error | AxiosError): string {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // Server sent error
      switch (err.response.status) {
        case 400:
          return "The request was invalid!";
        case 404:
          return "The selected task was not found!";
        case 406:
          return "The selected task is finished!";
        case 409:
          return "The returned result was invalid!";
        case 500:
          return "The server had an internal error, please try again later.";
        default:
          return (
            "An error has occurred! (ResponseError): " +
            err.response.status.toString() +
            " (" +
            err.response.data.toString() +
            ")"
          );
      }
    } else if (err.request) {
      // Got no response
      return (
        "An error has occurred! (RequestError): " + JSON.stringify(err.request)
      );
    } else {
      // Unknown
      return "An error has occurred! (Unknown Axios Error)";
    }
  } else {
    // Stock (non-Axios) error
    return (
      "An error has occurred! (" +
      err.name.toString() +
      "): " +
      err.message.toString()
    );
  }
}

const taskService = {
  /* Get an array of tasks */
  getTasks: new Promise(function (resolve, reject) {
    axios
      .get<TaskList>(serverURL + "task")
      .then((res: AxiosResponse<TaskList>): void => {
        resolve(res.data);
      })
      .catch((err: Error | AxiosError): void => {
        reject(errToString(err));
      });
  }),

  /* Get information about specific task */
  getTask: function (id: string): Promise<Task> {
    return new Promise<Task>(function (resolve, reject) {
      axios
        .get<Task>(serverURL + "task/" + id)
        .then((res: AxiosResponse<Task>) => {
          resolve(res.data);
        })
        .catch((err: Error | AxiosError) => {
          reject(errToString(err));
        });
    });
  },

  /* Request a subtask */
  getSubtask: function (id: string): Promise<exSubTask> {
    return new Promise<exSubTask>(function (resolve, reject) {
      axios
        .get<exSubTask>(serverURL + "task/request-subtask/" + id)
        .then((res: AxiosResponse<exSubTask>) => {
          resolve(res.data);
        })
        .catch((err: Error | AxiosError) => {
          reject(errToString(err));
        });
    });
  },

  /* Hand in result of subtask */
  returnSubresult: function (
    id: string,
    subtask: SubTask,
    result: string | number | Array<string | number>
  ): Promise<void> {
    return new Promise<void>(function (resolve, reject) {
      axios
        .post<void>(
          serverURL + "task/return-subresult",
          { id, subtask, result },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(() => {
          resolve();
        })
        .catch((err: Error | AxiosError) => {
          reject(errToString(err));
        });
    });
  },

  /* Get task progress */
  getTaskProgress: function (id: string): Promise<[TaskProgress, number]> {
    return new Promise<[TaskProgress, number]>(function (resolve, reject) {
      axios
        .get<[TaskProgress, number]>(serverURL + "task/progress/" + id)
        .then((res: AxiosResponse<[TaskProgress, number]>) => {
          resolve(res.data);
        })
        .catch((err: Error | AxiosError) => {
          reject(errToString(err));
        });
    });
  },

  /* Add task */
  addTask: function (task: Task): Promise<string> {
    return new Promise<string>(function (resolve, reject) {
      axios
        .post<string>(serverURL + "task", task, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((res: AxiosResponse<string>) => {
          resolve(res.data);
        })
        .catch((err: Error | AxiosError) => {
          reject(errToString(err));
        });
    });
  },

  /* Update task */
  updateTask: function (task: Task, reset: boolean): Promise<boolean> {
    return new Promise<boolean>(function (resolve, reject) {
      axios
        .put<string>(
          serverURL + "task",
          { task, reset },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(() => {
          resolve(true);
        })
        .catch((err: Error | AxiosError) => {
          reject(errToString(err));
        });
    });
  },

  /* Delete task */
  deleteTask: function (id: string): Promise<void> {
    return new Promise<void>(function (resolve, reject) {
      axios
        .delete<void>(serverURL + "task/" + id)
        .then(() => {
          resolve();
        })
        .catch((err: Error | AxiosError) => {
          reject(errToString(err));
        });
    });
  }
};
export default taskService;
