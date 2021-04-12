// client/src/services/taskService.ts
// How to use:
// Import the taskService:
//   import taskService from "@/services/taskService";
// Access functions:
//   taskService.getTask();

import axios from "axios";

const serverURL = "http://localhost:3000/";

interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
}

const taskService = {
  async getTasks(): Promise<{ [id: string]: Task }> {
    const res = await axios.get<{ [id: string]: Task }>(serverURL + "task");
    const tasks: { [id: string]: Task } = res.data;
    return tasks;
  },
  async getTask(taskId: string): Promise<Task> {
    const res = await axios.get<Task>(serverURL + "task/" + taskId);
    return res.data;
  },
  async idValidator(taskId: string): Promise<boolean> {
    const res = await axios.get<Task>(serverURL + "task/" + taskId);
    return typeof res.data.title !== "undefined";
  },
  async addTask(task: Task): Promise<string> {
    const res = await axios.post<Task>(serverURL + "task", task, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data.id;
  },
  async updateTask(task: Task): Promise<string> {
    const res = await axios.put<Task>(serverURL + "task", task, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data.id;
  },
  async deleteTask(taskId: string): Promise<string> {
    const res = await axios.delete<Task>(serverURL + "task/" + taskId);
    return res.data.id;
  }
};
export default taskService;
