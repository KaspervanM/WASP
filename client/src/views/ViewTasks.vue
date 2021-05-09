<template>
  <div class="viewtasks">
    <p class="header1" id="title">View Tasks</p>
    <b-container id="task-container">
      <b-card
        :title="task.title"
        id="task"
        v-for="task in tasks"
        v-bind:key="task.id"
      >
        <b-card-text>
          {{ task.description }}
        </b-card-text>
        <b-button :href="'/id/' + task.id" variant="primary"
          >Help this task</b-button
        >
      </b-card>
      <b-alert v-model="showErrorAlert" variant="danger" dismissible>
        {{ errMsg }}
      </b-alert>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
}
type TaskList = { [id: string]: Task };

export default Vue.extend({
  name: "ViewTasks",
  data(): { tasks: TaskList; showErrorAlert: boolean; errMsg: string } {
    let tasks: TaskList = {};
    return { tasks, showErrorAlert: false, errMsg: "" };
  },
  mounted(): void {
    taskService.getTasks
      .then((tasks): void => {
        this.tasks = tasks as TaskList;
        this.showErrorAlert = false; //Hide any old error alert
      })
      .catch((err: string): void => {
        console.error(err);
        this.errMsg = err; // Set the error message
        this.showErrorAlert = true; //Show error alert
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
#task-container {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: space-evenly;
  #task {
    margin: 1vh;
    display: flex;
    flex-direction: column;
    white-space: pre-wrap;
  }
}
</style>
