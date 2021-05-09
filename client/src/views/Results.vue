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
      const confirmDownload = this.confirmDownload;
      return new Promise(function (resolve, reject) {
        confirmDownload()
          .then(() => {
            taskService
              .downloadResult(id)
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
          })
          .catch(() => {
            reject("'no' was selected");
          });
      });
    },
    confirmDownload: function (): Promise<number> {
      return new Promise(function (resolve, reject) {
        if (confirm("Are you sure you want to download?")) {
          resolve(1);
          return;
        }
        reject(0);
        return;
      });
    }
  }
});
</script>

<style lang="scss"></style>
