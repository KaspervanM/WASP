<template>
  <div class="results">
    <p class="header1">Thank you for helping this task!</p>
    <p>This task is now complete: {{ taskId }}</p>
    <b-button variant="outline-success" @click="returnResults"
      >Give me the results!</b-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

export default Vue.extend({
  name: "Results",
  props: { taskId: String },
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
    }
  }
});
</script>

<style lang="scss"></style>
