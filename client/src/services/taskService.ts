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

interface Config {
  START: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  PRIVATE: boolean;
  ALLOW_ANONYMOUS_USERS?: boolean;
}

interface TaskProgress {
  value: number;
  max: number;
}

interface Task {
  id: string;
  password: string;
  title: string;
  description: string;
  config: Config | string;
  code: string;
}
type TaskList = { [id: string]: Task };

const taskService = {
  async getTasks(): Promise<TaskList> {
    const res: AxiosResponse = await axios.get<TaskList>(serverURL + "task");
    return res.data;
  },
  async getTask(taskId: string): Promise<Task> {
    const res: AxiosResponse = await axios.get<Task>(
      serverURL + "task/" + taskId
    );
    return res.data;
  },
  async getSubtask(taskId: string): Promise<[SubTask, string]> {
    const res: AxiosResponse = await axios.get<[SubTask, string]>(
      serverURL + "task/request-subtask/" + taskId
    );
    return res.data;
  },
  async returnSubresult(
    taskId: string,
    subtask: SubTask,
    result: string | number | Array<string | number>
  ): Promise<boolean> {
    const res: AxiosResponse = await axios.post<boolean>(
      serverURL + "task/return-subresult/",
      { id: taskId, subtask: subtask, result: result },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res.data;
  },
  async getTaskProgress(taskId: string): Promise<[TaskProgress, number]> {
    const res = await axios.get<[TaskProgress, number]>(
      serverURL + "task/progress/" + taskId
    );
    return res.data;
  },
  async addTask(task: Task): Promise<string> {
    const res: AxiosResponse = await axios.post<Task>(
      serverURL + "task",
      task,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res.data.id;
  },
  async updateTask(task: Task): Promise<string> {
    const res: AxiosResponse = await axios.put<Task>(serverURL + "task", task, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data.id;
  },
  async deleteTask(taskId: string): Promise<string> {
    const res: AxiosResponse = await axios.delete<Task>(
      serverURL + "task/" + taskId
    );
    return res.data.id;
  },
  downloadResult(
    taskId: string,
    password: string
  ): Promise<AxiosResponse<number | Array<number | string>>> {
    return axios.post<number | Array<number | string>>(
      serverURL + "task/results/",
      { id: taskId, password: password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
export default taskService;
