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

interface Subtask {
  start: number;
  end: number;
  finished: boolean;
}

type ExSubtask = [Subtask, string];

export default Vue.extend({
  name: "Home",
  components: {
    TheSidebar
  },
  data(): { id: string; toastCount: number } {
    return {
      id: "",
      toastCount: 0
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = "WASP - " + (to.name || "Some Default Title");
      }
    }
  },
  mounted() {
    this.toast("b-toaster-bottom-center");
    if (this.$cookies.isKey("TaskId")) {
      this.startTaskLoop(this.$cookies.get("TaskId"));
    }
  },
  methods: {
    returnSubresult: function (
      subtask: Subtask,
      result: string | number | Array<string | number>
    ): void {
      taskService
        .returnSubresult(this.id, subtask, result)
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
          if (err.includes("found")) {
            this.stopTaskLoop();
            return;
          }
          if (!err.includes("available")) {
            this.taskloop(); // Continue with taskloop
          }
        });
    },
    evaluateCode: function (subtask: ExSubtask): void {
      import("@/services/evaluateCode")
        .then((module): void => {
          module
            .evaluate(subtask[1], subtask[0].start, subtask[0].end)
            .then((res: string | number | Array<string | number>): void => {
              this.returnSubresult(subtask[0], res);
            })
            .catch((err: string): void => {
              console.error(err); // Log the error
              this.$bvToast.toast(err, {
                title: "Error!",
                variant: "danger",
                autoHideDelay: 5000
              }); // Toast the error
              this.stopTaskLoop(); // End the taskloop
            });
        })
        .catch((err: Error): void => {
          console.error(err); // Log the real error
          this.$bvToast.toast(
            "An error occurred while importing the evaluateCode module!",
            {
              title: "Error!",
              variant: "danger",
              autoHideDelay: 5000
            }
          ); // Toast the error
          this.stopTaskLoop(); // End the taskloop
        });
    },
    taskloop: function (): void {
      if (!this.$cookies.isKey("TaskId")) {
        this.id = "";
        console.log("stopped");
        return;
      }
      taskService
        .getSubtask(this.id)
        .then((subtask: ExSubtask): void => {
          this.evaluateCode(subtask);
        })
        .catch((err: string): void => {
          if (err.includes("finished")) {
            //(Go to results)
            console.log("finished");
          } else {
            console.error(err); // Log the error
            this.$bvToast.toast(err, {
              title: "Error!",
              variant: "danger",
              autoHideDelay: 5000
            }); // Toast the error
            if (err.includes("found")) {
              this.stopTaskLoop();
              return;
            }
            if (!err.includes("available")) {
              this.taskloop(); // Continue with taskloop
            }
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
    },

    toast: function (toaster: string | undefined, append = false): void {
      this.toastCount++;
      if (this.toastCount < 2) {
        this.$bvToast.toast(
          `By using this site, you consent to these cookies.`,
          {
            title: `This site uses functional cookies.`,
            noAutoHide: true,
            solid: true,
            toaster: toaster,
            appendToast: append
          }
        );
      }
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
  font-size: 1rem;
}
.header1 {
  padding: 5px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3rem;
  font-weight: bold;
}
.header2 {
  padding-top: 4px;
  margin-bottom: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.8rem;
}
.header3 {
  padding-top: 2px;
  margin-bottom: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.4rem;
}

.custom-tooltip > .tooltip-inner {
  max-width: none;
}
</style>
