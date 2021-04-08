<template>
  <div class="addtask">
    <p class="header1" id="title">Add Task</p>
    <br />
    <b-card title="Submit new task" class="form" bg-variant="light">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Task title:"
          label-for="input-1"
          label-align-sm="left"
          description="A good title for your task may help attract more users."
        >
          <b-form-input
            id="input-1"
            v-model="task.title"
            type="text"
            placeholder="Enter title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Task Description:"
          label-for="input-2"
          label-align-sm="left"
        >
          <b-form-textarea
            id="input-2"
            v-model="task.description"
            placeholder="Enter description"
            rows="3"
            no-resize
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Your Code:"
          label-for="input-3"
          label-align-sm="left"
        >
          <b-form-textarea
            id="input-3"
            v-model="task.code"
            placeholder="Enter code"
            rows="3"
            no-resize
            required
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        Task with ID: {{ task.id }} created succesfully!
        <br />
        <router-link :to="'/' + task.id" class="alert-link"
          >Click here to view your task</router-link
        >
      </b-alert>
      <b-alert v-model="showErrorAlert" variant="danger" dismissible
        >An error occurred!</b-alert
      >
    </b-card>
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
let task: Task = {
  id: "", //To be filled by server
  title: "", //To be filled by user
  description: "", //To be filled by user
  code: "" //To be filled by user
};
export default Vue.extend({
  data(): { task: Task; showSuccessAlert: boolean; showErrorAlert: boolean } {
    return {
      task,
      showSuccessAlert: false,
      showErrorAlert: false
    };
  },
  methods: {
    async onSubmit(event: any): Promise<void> {
      event.preventDefault();
      const id: string = await taskService.addTask(this.task);
      if (id) {
        this.task.id = id;
        console.log(`Created task with id: ${this.task.id}`);
        this.showSuccessAlert = true;
      } else {
        console.error("An error occurred while creating the task!");
        this.showErrorAlert = true;
      }
    },
    onReset(event: any): void {
      event.preventDefault();
      // Reset our form values
      this.task.title = "";
      this.task.description = "";
      this.task.code = "";
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.addtask {
  width: 100%;
  height: 100vh;
}
.form {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#title {
  float: left;
  display: inline-flex;
}
</style>
