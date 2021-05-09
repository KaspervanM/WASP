// client/src/services/taskService.ts
// How to use:
// Import the taskService:
//   import taskService from "@/services/taskService";
// Access functions:
//   taskService.getTask();

import axios, { AxiosResponse } from "axios";

const serverURL = "http://localhost:3000/";

interface SubTask {
  start: number;
  end: number;
  finished: boolean;
}

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

/* Handle Axios errors */
function errorHandler(error: any) {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
    return error.response;
  } else if (error.request) {
    console.error(error.request);
    return error.request;
  } else {
    console.error("Error", error.message);
    return error.message;
  }
}

const taskService = {
  async getTasks(): Promise<TaskList> {
    try {
      const res: AxiosResponse = await axios.get<TaskList>(serverURL + "task");
      return res.data;
    } catch (error) {
      return Promise.reject(errorHandler(error));
    }
  },
  async getTask(id: string): Promise<Task> {
    try {
      const res: AxiosResponse = await axios.get<Task>(
        serverURL + "task/" + id
      );
      return res.data;
    } catch (error) {
      return Promise.reject(errorHandler(error));
    }
  },
  async getSubtask(id: string): Promise<[SubTask, string]> {
    try {
      const res: AxiosResponse = await axios.get<[SubTask, string]>(
        serverURL + "task/request-subtask/" + id
      );
      return res.data;
    } catch (error) {
      return Promise.reject(errorHandler(error));
    }
  },
  async returnSubresult(
    id: string,
    subtask: SubTask,
    result: string | number | Array<string | number>
  ): Promise<boolean> {
    try {
      const res: AxiosResponse = await axios.post<boolean>(
        serverURL + "task/return-subresult/",
        { id, subtask, result },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return res.data;
    } catch (error) {
      return Promise.reject(errorHandler(error));
    }
  },
  async getTaskProgress(id: string): Promise<[TaskProgress, number]> {
    try {
      const res = await axios.get<[TaskProgress, number]>(
        serverURL + "task/progress/" + id
      );
      return res.data;
    } catch (error) {
      return Promise.reject(errorHandler(error));
    }
  },
  addTask: function (task: Task): Promise<AxiosResponse<string>> {
    return axios.post<string>(serverURL + "task", task, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async updateTask(task: Task, reset: boolean): Promise<string> {
    try {
      const res: AxiosResponse = await axios.put<Task>(
        serverURL + "task",
        { task, reset },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return res.data.id;
    } catch (error) {
      return Promise.reject(errorHandler(error));
    }
  },
  async deleteTask(id: string): Promise<string> {
    try {
      const res: AxiosResponse = await axios.delete<Task>(
        serverURL + "task/" + id
      );
      return res.data.id;
    } catch (error) {
      return Promise.reject(errorHandler(error));
    }
  }
};
export default taskService;
