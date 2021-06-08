import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Results from "../views/Results.vue";
import ViewTasks from "../views/ViewTasks.vue";
import AddTask from "../views/AddTask.vue";
import DeleteTask from "../views/DeleteTask.vue";
import TaskStarter from "../components/TaskStarter.vue";
import About from "../views/About.vue";
import Team from "../views/Team.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/results",
    name: "Results",
    component: Results
  },
  {
    path: "/viewtasks",
    name: "View Tasks",
    component: ViewTasks
  },
  {
    path: "/id/:id",
    name: "id",
    component: TaskStarter
  },
  {
    path: "/addtask",
    name: "Add Task",
    component: AddTask
  },
  {
    path: "/deletetask",
    name: "Delete Task",
    component: DeleteTask
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/team",
    name: "Team",
    component: Team
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
