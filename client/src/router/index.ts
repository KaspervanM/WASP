import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import AddTask from "../views/AddTask.vue";
import DeleteTask from "../views/DeleteTask.vue";
import TaskStarter from "../components/TaskStarter.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/id/:id",
    name: "Dashboard",
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
