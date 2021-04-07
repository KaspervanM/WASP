// client/src/services/taskService.js
import axios from "axios";

interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
}

const taskService = {
  async getTasks() {
    const res = await axios.get<{ [id: string]: Task }>(
      "http://localhost:3000/task"
    );
    const tasks: { [id: string]: Task } = res.data;
    return tasks;
  },
  async getTask(taskId: string) {
    const res = await axios.get("http://localhost:3000/task/" + taskId);
    return res.data;
  },
  async addTask(task: Task) {
    const res = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      url: "http://localhost:3000/task",
      data: task
    });
    return res.data;
  },
  async updateTask(task: Task) {
    const res = await axios({
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      url: "http://localhost:3000/task",
      data: task
    });
    return res.data;
  },
  async deleteTask(taskId: string) {
    const res = await axios.delete("http://localhost:3000/task/" + taskId);
    return res.data;
  }
};
export default taskService;
