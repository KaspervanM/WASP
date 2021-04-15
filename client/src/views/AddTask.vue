<template>
  <div class="addtask">
    <p class="header1" id="title">Add Task</p>
    <b-container
      title="Submit a new task"
      id="form-container"
      bg-variant="light"
    >
      <b-form id="form" @submit="onSubmit" @reset="onReset">
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
            @input="showSuccessAlert = showErrorAlert = false"
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
            @input="showSuccessAlert = showErrorAlert = false"
            placeholder="Enter description"
            max-rows="4"
            no-resize
            required
          ></b-form-textarea>
        </b-form-group>

        <div id="input-group-3">
          <label>Your code:</label>
          <b-form-textarea
            id="input-3"
            v-model="task.code"
            @input="showSuccessAlert = showErrorAlert = false"
            placeholder="Enter code"
            ref="ta"
            @keydown.native.tab.exact.prevent="tab"
            max-rows="100"
            no-resize
            required
          ></b-form-textarea>
        </div>
        <br />
        <div>
          <b-button class="button" type="submit" variant="primary"
            >Submit</b-button
          >
          <b-button class="button" type="reset" variant="danger"
            >Reset</b-button
          >
        </div>
        <br />
        <b-alert v-model="showSuccessAlert" variant="success" dismissible>
          Task with ID: {{ task.id }} created succesfully!
          <br />
          <router-link :to="'/id/' + task.id" class="alert-link"
            >Click here to view your task</router-link
          >
        </b-alert>
        <b-alert v-model="showErrorAlert" variant="danger" dismissible
          >An error occurred!</b-alert
        >
      </b-form>
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
let task: Task = {
  id: "", //To be filled by server
  title: "", //To be filled by user
  description: "", //To be filled by user
  code: "" //To be filled by user
};
export default Vue.extend({
  name: "AddTask",
  data(): { task: Task; showSuccessAlert: boolean; showErrorAlert: boolean } {
    return {
      task,
      showSuccessAlert: false,
      showErrorAlert: false
    };
  },
  methods: {
    async onSubmit(event: Event): Promise<void> {
      event.preventDefault();
      const id: string = await taskService.addTask(this.task);
      if (id) {
        this.task.id = id;
        console.log(`Created task with id: ${id}`);
        this.showErrorAlert = false; //Hide any old error alert
        this.showSuccessAlert = true; //Show success alert
      } else {
        console.error("An error occurred while creating the task!");
        this.showSuccessAlert = false; //Hide any old success alert
        this.showErrorAlert = true; //Show error alert
      }
    },
    onReset(event: Event): void {
      event.preventDefault();
      // Reset our form values
      this.task.title = "";
      this.task.description = "";
      this.task.code = "";
      this.showSuccessAlert = false; //Hide any old success alert
      this.showErrorAlert = false; //Show error alert
    },
    tab(): void {
      const index: number = ((this as unknown) as {
        $refs: {
          ta: HTMLInputElement;
        };
      }).$refs.ta.selectionStart as number;
      this.task.code =
        this.task.code.slice(0, index) + "\t" + this.task.code.slice(index);
      this.$nextTick((): void => {
        ((this as unknown) as {
          $refs: {
            ta: HTMLInputElement;
          };
        }).$refs.ta.setSelectionRange(index + 1, index + 1);
      });
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
    height: 95%;
    width: 100%;
  }
}
#input-group-3 {
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
#input-3 {
  flex-grow: 1;
  max-height: 95vh;
}
.button {
  margin: 5px;
}
</style>
