<template>
  <div class="results">
    <p class="header1">Thank you for helping this task!</p>
    <p>This task is now complete: {{ taskId }}</p>
    <div class="button-container">
      <b-button variant="outline-success" @click="returnResults"
        >Give me the results!</b-button
      >
      <b-button variant="outline-danger" @click="leaveResultsPage"
        >Leave this task</b-button
      >
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

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
  password: string;
  title: string;
  description: string;
  config: Config | string;
  code: string;
}
export default Vue.extend({
  name: "Results",
  data(): {
    showPrompt: boolean;
    password: string;
    nameState: boolean;
    invalidFeedback: string;
  } {
    return {
      showPrompt: false,
      password: "",
      nameState: (null as unknown) as boolean,
      invalidFeedback: "Password is required"
    };
  },
  props: { taskId: String },
  created(): void {
    if (!this.$cookies.isKey("TaskId")) {
      this.$router.push("/");
    }
  },
  methods: {
    createToast: function (err: string): void {
      this.$bvToast.toast(err, {
        title: "Error!",
        variant: "danger",
        autoHideDelay: 5000
      }); // Toast the error
    },
    returnResults: function (): void {
      const id: string = this.taskId;
      taskService.getTask(id).then((task: Task): void => {
        if ((task.config as Config).PUBLIC_RESULT) {
          taskService
            .downloadResult(id)
            .then((data: number | Array<number | string>): void => {
              this.downloadResults(id, data);
            })
            .catch((err: string): void => {
              this.createToast(err);
            });
        } else this.showPrompt = true;
      });
    },
    downloadResults: function (
      id: string,
      data: number | Array<number | string>
    ): void {
      const blob: Blob = new Blob([JSON.stringify(data)], {
        type: "application/plain"
      });
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = id.toString() + ".json";
      link.click();
      URL.revokeObjectURL(link.href);
    },
    onSubmit: function (): void {
      if (!this.checkFormValidity()) {
        this.nameState = false;
        this.invalidFeedback = "Password is required";
        return;
      }
      const id: string = this.taskId;
      const pass: string = this.password;
      taskService
        .downloadResult(id, pass)
        .then((data: number | Array<number | string>): void => {
          this.downloadResults(id, data);
          this.$bvModal.hide("password-prompt");
        })
        .catch((err: string): void => {
          this.nameState = false;
          if (err.includes("password"))
            this.invalidFeedback = "Incorrect password";
          else this.invalidFeedback = "Something went wrong: " + err;
        });
    },
    checkFormValidity(): boolean {
      return ((this as unknown) as {
        $refs: {
          form: HTMLInputElement;
        };
      }).$refs.form.checkValidity();
    },
    resetModal(): void {
      this.password = "";
      this.nameState = (null as unknown) as boolean;
    },
    handleOk(bvModalEvt: Event): void {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.onSubmit();
    },
    leaveResultsPage: function () {
      this.$emit("remove-cookies");
      this.$router.push("/");
    }
  }
});
</script>

<style lang="scss">
.button-container {
  display: block;
}
.button-container > * {
  margin: 5px;
}
</style>
