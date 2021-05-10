<template>
  <div class="deletetask">
    <p class="header1" id="title">Delete Task</p>
    <b-container title="Remove a task" id="form-container" bg-variant="light">
      <b-form id="form" @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Task ID:"
          label-for="input-1"
          label-align-sm="left"
          description="The task ID is given to you when you create a new task."
        >
          <b-form-input
            id="input-1"
            v-model="taskId"
            type="text"
            @input="showSuccessAlert = showErrorAlert = false"
            :state="taskIdState"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            aria-describedby="input-live-help input-live-feedback"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            It should be a uuid. Example: 123e4567-e89b-12d3-a456-426614174000
          </b-form-invalid-feedback>
        </b-form-group>

        <div>
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
        <br />
        <b-alert v-model="showSuccessAlert" variant="success" dismissible>
          Task with ID: {{ taskId }} deleted succesfully!
          <br />
          <router-link to="/addtask" class="alert-link"
            >Click here to create a new task</router-link
          >
        </b-alert>
        <b-alert v-model="showErrorAlert" variant="danger" dismissible>
          {{ errMsg }}
        </b-alert>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

export default Vue.extend({
  name: "DeleteTask",
  data(): {
    taskId: string;
    showSuccessAlert: boolean;
    showErrorAlert: boolean;
    errMsg: string;
  } {
    return {
      taskId: "",
      showSuccessAlert: false,
      showErrorAlert: false,
      errMsg: ""
    };
  },
  computed: {
    taskIdState: function (): boolean {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        this.taskId
      );
    }
  },
  methods: {
    onSubmit(event: Event): void {
      event.preventDefault();
      if (this.taskIdState) {
        taskService
          .deleteTask(this.taskId)
          .then((): void => {
            console.log(`Deleted task with id: ${this.taskId}`);
            this.showErrorAlert = false; //Hide any old error alert
            this.showSuccessAlert = true; //Show success alert
          })
          .catch((err: string): void => {
            console.error(err);
            this.errMsg = err; // Set the error message
            this.showSuccessAlert = false; //Hide any old success alert
            this.showErrorAlert = true; //Show error alert
          });
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.deletetask {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
#title {
  float: left;
  display: inline-flex;
}
#form-container {
  flex-grow: 1;
  #form {
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 100%;
  }
}
</style>
