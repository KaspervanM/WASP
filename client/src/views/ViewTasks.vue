<template>
  <div class="viewtasks">
    <p class="header1" id="title">View Tasks</p>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
    <b-table
      :items="tasks"
      :per-page="perPage"
      :current-page="currentPage"
      fixed
      hover
      ><template #cell(id)="id">
        <router-link :to="`/id/${id.value}`">{{ id.value }}</router-link>
      </template></b-table
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

interface Subtask {
  start: number;
  end: number;
  finished: boolean;
}

interface Config {
  START: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  PUBLIC_RESULT?: boolean;
  ALLOW_ANONYMOUS_USERS?: boolean;
}

interface Task {
  id: string;
  password?: string;
  title: string;
  description: string;
  config?: Config | string;
  code?: string;
  subtasks?: Subtask[];
  result?: number | string | Array<string | number>;
  speed?: number;
}
type TaskList = Task[];

export default Vue.extend({
  name: "ViewTasks",
  data(): { tasks: TaskList; perPage: number; currentPage: number } {
    let tasks: TaskList = [];
    return { tasks: tasks, perPage: 10, currentPage: 1 };
  },
  computed: {
    rows(): number {
      return this.tasks.length;
    }
  },
  mounted(): void {
    taskService
      .getTasks()
      .then((tasks: TaskList): void => {
        tasks.forEach((e: Task) => {
          delete e.password;
          delete e.config;
          delete e.code;
          delete e.subtasks;
          delete e.result;
          delete e.speed;
        });
        this.tasks = tasks;
      })
      .catch((err: string): void => {
        console.error(err);
        this.$bvToast.toast(err, {
          title: "Error!",
          variant: "danger",
          autoHideDelay: 5000
        }); // Toast the error
      });
  }
});
</script>

<style lang="scss" scoped>
.viewtasks {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
#title {
  float: left;
  display: inline-flex;
}
</style>
