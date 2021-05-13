<template>
  <div class="results">
    <p class="header1">Thank you for helping this task!</p>
    <p>This task is now complete: {{ taskId }}</p>
    <div class="button-container">
      <b-button variant="outline-success" @click="returnResults"
        >Give me the results!</b-button
      >
      <b-button variant="outline-danger" @click="leaveResults"
        >Leave this task</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

export default Vue.extend({
  name: "Results",
  props: { taskId: String },
  created() {
    if (!this.$cookies.isKey("TaskId")) {
      this.$router.push("/");
    }
  },
  methods: {
    returnResults: function (): void {
      this.initiateDownload()
        .then(() => {
          console.log("done");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initiateDownload: function (): Promise<string> {
      const id = this.taskId;
      const promptPassword = this.promptPassword;
      return new Promise(function (resolve, reject) {
        promptPassword().then((pass) => {
          taskService
            .downloadResult(id, pass)
            .then((response) => {
              const blob = new Blob([JSON.stringify(response.data)], {
                type: "application/plain"
              });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = id.toString() + ".json";
              link.click();
              URL.revokeObjectURL(link.href);
              resolve("success");
            })
            .catch(() => {
              console.error;
              reject("error getting results");
            });
        });
      });
    },
    promptPassword: async function (): Promise<string> {
      const privateTask: boolean = (await taskService.getTask(this.taskId))
        .config["PRIVATE"];
      console.log(await taskService.getTask(this.taskId));
      return new Promise(function (resolve) {
        if (privateTask) {
          resolve(prompt("Enter the password"));
          return;
        }
        resolve("");
        return;
      });
    },
    leaveResults: function () {
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
