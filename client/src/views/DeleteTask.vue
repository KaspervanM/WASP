<template>
  <div class="deletetask">
    <p class="header1" id="title">Delete Task</p>
    <br />
    <b-card title="Remove a task" id="form-container" bg-variant="light">
      <b-form id="form" @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Task Id:"
          label-for="input-1"
          label-align-sm="left"
          description="The task Id is given to you when you create a new task."
        >
          <b-form-input
            id="input-1"
            v-model="taskId"
            type="text"
            @input="showSuccessAlert = showErrorAlert = false"
            placeholder="Enter Id (e.g. 1default-task-uuid-wasp-twelvecharss)"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <br />
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        Task with ID: {{ taskId }} deleted succesfully!
        <br />
        <router-link to="/addtask" class="alert-link"
          >Click here to create a new task</router-link
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

export default Vue.extend({
  data(): {
    taskId: string;
    showSuccessAlert: boolean;
    showErrorAlert: boolean;
  } {
    return {
      taskId: "",
      showSuccessAlert: false,
      showErrorAlert: false
    };
  },
  methods: {
    async onSubmit(event: any): Promise<void> {
      event.preventDefault();
      const id: string = await taskService.deleteTask(this.taskId);
      if (id == this.taskId) {
        console.log(`Deleted task with id: ${id}`);
        this.showErrorAlert = false; //Hide any old error alert
        this.showSuccessAlert = true; //Show success alert
      } else {
        console.error(
          "An error occurred while deleting the task: id mismatch!"
        );
        this.showSuccessAlert = false; //Hide any old success alert
        this.showErrorAlert = true; //Show error alert
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.addtask {
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
