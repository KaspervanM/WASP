<template>
  <div id="app">
    <TheSidebar></TheSidebar>
    <router-view
      @start-task="startTaskLoop"
      @remove-cookies="stopTaskLoop"
      :task-id="id"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import Vue from "vue";
import TheSidebar from "@/components/TheSidebar.vue";
import taskService from "@/services/taskService";

interface SubTask {
  start: number;
  end: number;
  finished: boolean;
}

type exSubTask = [SubTask, string];

export default Vue.extend({
  name: "Home",
  components: {
    TheSidebar
  },
  data(): { id: string } {
    return { id: "" };
  },
  mounted() {
    if (this.$cookies.isKey("TaskId")) {
      this.startTaskLoop(this.$cookies.get("TaskId"));
    }
  },
  methods: {
    taskloop: function (): void {
      if (!this.$cookies.isKey("TaskId")) {
        this.id = "";
        console.log("stopped");
        return;
      }
      taskService
        .getSubtask(this.id)
        .then((subTask: exSubTask): void => {
          let result: string | number | Array<string | number>; // Initialise result
          import("@/services/evaluateCode").then((module): void => {
            result = module.evaluate(
              subTask[1],
              subTask[0].start,
              subTask[0].end
            );
            taskService
              .returnSubresult(this.id, subTask[0], result)
              .then((): void => {
                this.taskloop(); // Continue with taskloop
              })
              .catch((err: string): void => {
                console.error(err); // Log the error
                this.$bvToast.toast(err, {
                  title: "Error!",
                  variant: "danger",
                  autoHideDelay: 5000
                }); // Toast the error
                if (err.includes("available")) {
                  this.stopTaskLoop(); // End the taskloop
                } else this.taskloop(); // Continue with taskloop
              });
          });
        })
        .catch((err: string): void => {
          if (err.includes("finished")) {
            //(Go to results)
            console.log("finished");
            this.stopTaskLoop(); // End the taskloop
          } else {
            console.error(err); // Log the error
            this.$bvToast.toast(err, {
              title: "Error!",
              variant: "danger",
              autoHideDelay: 5000
            }); // Toast the error
            if (err.includes("available")) {
              this.stopTaskLoop(); // End the taskloop
            } else this.taskloop(); // Continue with taskloop
          }
        });
    },
    startTaskLoop: function (id: string): void {
      if (this.id === id) {
        // Already helping this task
        return;
      }
      this.$cookies.set("TaskId", id);
      this.id = id;
      this.taskloop();
    },
    stopTaskLoop: function (): void {
      this.$cookies.remove("TaskId");
      this.id = "";
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
.header1 {
  padding: 5px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3rem;
  font-weight: bold;
}
</style>
