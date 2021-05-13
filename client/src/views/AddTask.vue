<template>
  <div class="addtask">
    <p class="header1" id="title">Add Task</p>
    <b-container
      title="Submit a new task"
      id="form-container"
      bg-variant="light"
    >
      <b-form id="form" @submit="onSubmit" @reset="onReset">
        <div class="input-block">
          <b-form-group
            id="input-group-1"
            class="block-elem"
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
            class="block-elem"
            label="Task password:"
            label-for="input-2"
            label-align-sm="left"
            description="Use this password if you want to see the results if private is set to true."
          >
            <b-form-input
              id="input-2"
              v-model="task.password"
              type="password"
              @input="showSuccessAlert = showErrorAlert = false"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="input-block">
          <b-form-group
            id="input-group-3"
            class="block-elem"
            label="Task Description:"
            label-for="input-3"
            label-align-sm="left"
          >
            <b-form-textarea
              id="input-3"
              v-model="task.description"
              @input="showSuccessAlert = showErrorAlert = false"
              placeholder="Enter description"
              rows="8"
              max-rows="8"
              no-resize
              required
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            id="input-group-4"
            class="block-elem"
            label="Task Configuration:"
            label-for="input-4"
            label-align-sm="left"
          >
            <b-form-textarea
              id="input-4"
              v-model="task.config"
              @input="showSuccessAlert = showErrorAlert = false"
              placeholder="Enter configuration"
              rows="8"
              max-rows="8"
              no-resize
              required
            ></b-form-textarea>
          </b-form-group>
          <b-tooltip
            custom-class="custom-tooltip"
            target="input-group-4"
            triggers="focus"
          >
            <pre>{{ tooltip }}</pre>
          </b-tooltip>
        </div>
        <div id="input-group-5">
          <label>Your code:</label>
          <b-form-textarea
            id="input-5"
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
  password: string;
  title: string;
  description: string;
  config: string;
  code: string;
}
let task: Task = {
  id: "", //To be filled by server
  password: "", //To be filled by server
  title: "", //To be filled by user
  description: "", //To be filled by user
  config: "",
  code: "" //To be filled by user
};
export default Vue.extend({
  name: "AddTask",
  data(): {
    task: Task;
    tooltip: string;
    showSuccessAlert: boolean;
    showErrorAlert: boolean;
  } {
    return {
      task,
      tooltip: `interface Config {
  START: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  PRIVATE: boolean;
  ALLOW_ANONYMOUS_USERS?: boolean;
}`,
      showSuccessAlert: false,
      showErrorAlert: false
    };
  },
  mounted() {
    this.task.config = `{
  "START": 0,
  "END": 10,
  "BATCH_SIZE": 1,
  "RESULT": "sum",
  "PRIVATE": true,
  "ALLOW_ANONYMOUS_USERS": true
}`;
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
      this.task.password = "";
      this.task.title = "";
      this.task.description = "";
      this.task.config = "";
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
.input-block {
  display: flex;
}
.block-elem {
  flex-grow: 1;
  margin-left: 5px;
  height: 100%;
}
.custom-tooltip pre {
  text-align: left;
  color: whitesmoke;
}

#input-group-5 {
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
#input-5 {
  flex-grow: 1;
  max-height: 95vh;
}
.button {
  margin: 5px;
}
</style>
