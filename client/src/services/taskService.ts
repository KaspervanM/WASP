// client/src/services/taskService.ts
// How to use:
// Import the taskService:
//   import taskService from "@/services/taskService";
// Access functions:
//   taskService.getTask();

import axios, { AxiosResponse } from "axios";

const serverURL = "http://localhost:3000/";

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
  async getTaskProgress(taskId: string): Promise<TaskProgress> {
    const res = await axios.get<TaskProgress>(
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
  }
};
export default taskService;
