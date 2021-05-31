<template>
  <div class="deletetask">
    <p class="header1" id="title">Delete Task</p>
    <b-container id="form-container" bg-variant="light">
      <b-form
        id="form"
        @submit.stop.prevent="
          if (taskState) {
            showPrompt = true;
          }
        "
      >
        <b-form-group
          id="input-group-1"
          label="Task ID:"
          label-for="input-1"
          label-align-sm="left"
          :invalid-feedback="taskInvalidFeedback"
          :state="taskState"
          description="The task ID is given to you when you create a new task."
        >
          <b-form-input
            id="input-1"
            v-model="id"
            type="text"
            :state="taskState"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            required
          ></b-form-input>
        </b-form-group>
        <div>
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
    </b-container>
    <b-modal
      id="password-prompt"
      v-model="showPrompt"
      ref="modal"
      title="Enter Password"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="onSubmit">
        <b-form-group
          label="Password"
          label-for="password-input"
          :invalid-feedback="invalidFeedback"
          :state="nameState"
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="password"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

export default Vue.extend({
  name: "DeleteTask",
  data(): {
    id: string;
    showPrompt: boolean;
    password: string;
    taskState: boolean;
    nameState: boolean;
    invalidFeedback: string;
    taskInvalidFeedback: string;
  } {
    return {
      id: "",
      showPrompt: false,
      password: "",
      taskState: null as unknown as boolean,
      nameState: null as unknown as boolean,
      invalidFeedback: "Password required",
      taskInvalidFeedback:
        "It should be a uuid. Example: 123e4567-e89b-12d3-a456-426614174000"
    };
  },
  watch: {
    id(id): void {
      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          id
        )
      ) {
        this.taskInvalidFeedback =
          "It should be a uuid. Example: 123e4567-e89b-12d3-a456-426614174000";
        this.taskState = false;
        return;
      }
      taskService
        .getTask(id)
        .then(() => {
          this.taskState = true;
        })
        .catch((err): void => {
          this.taskInvalidFeedback = err;
          this.taskState = false;
          return;
        });
    }
  },
  methods: {
    onSubmit: function (): void {
      if (!this.checkFormValidity()) {
        this.invalidFeedback = "Password required";
        this.nameState = false;
        return;
      }
      const id: string = this.id;
      const pass: string = this.password;
      taskService
        .deleteTask(id, pass)
        .then((): void => {
          this.$bvModal.hide("password-prompt");
          this.$bvToast.toast(
            `Task with ID: ${id} deleted succesfully! Click here to create a new task`,
            {
              to: "/addtask",
              title: "Success!",
              variant: "success",
              autoHideDelay: 5000
            }
          ); // Toast the success
        })
        .catch((err: string): void => {
          this.invalidFeedback = err;
          this.nameState = false;
        });
    },
    checkFormValidity(): boolean {
      return (
        this as unknown as {
          $refs: {
            form: HTMLInputElement;
          };
        }
      ).$refs.form.checkValidity();
    },
    resetModal(): void {
      this.password = "";
      this.nameState = null as unknown as boolean;
    },
    handleOk(bvModalEvt: Event): void {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.onSubmit();
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
