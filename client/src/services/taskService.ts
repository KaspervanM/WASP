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

const taskService = {
  async getTasks(): Promise<TaskList> {
    const res: AxiosResponse = await axios.get<TaskList>(serverURL + "task");
    return res.data;
  },
  async getTask(id: string): Promise<Task> {
    const res: AxiosResponse = await axios.get<Task>(serverURL + "task/" + id);
    return res.data;
  },
  async getSubtask(id: string): Promise<[SubTask, string]> {
    const res: AxiosResponse = await axios.get<[SubTask, string]>(
      serverURL + "task/request-subtask/" + id
    );
    return res.data;
  },
  async returnSubresult(
    id: string,
    subtask: SubTask,
    result: string | number | Array<string | number>
  ): Promise<boolean> {
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
  },
  async getTaskProgress(id: string): Promise<[TaskProgress, number]> {
    const res = await axios.get<[TaskProgress, number]>(
      serverURL + "task/progress/" + id
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
    return res.data;
  },
  async updateTask(task: Task, reset: boolean): Promise<string> {
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
  },
  async deleteTask(id: string): Promise<string> {
    const res: AxiosResponse = await axios.delete<Task>(
      serverURL + "task/" + id
    );
    return res.data.id;
  }
};
export default taskService;
