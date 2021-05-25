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
  data(): { id: string; toastCount: number } {

    return {
      id: "",
      toastCount: 0
    };
  },
  mounted() {
    this.toast("b-toaster-bottom-center");
    if (this.$cookies.isKey("TaskId")) {
      this.startTaskLoop(this.$cookies.get("TaskId"));
    }
  },
  methods: {
    taskloop: async function (): Promise<void> {
      const subtask: exSubTask = await taskService.getSubtask(this.id);
      if (typeof subtask[0].start === "undefined") {
        console.log("STOPPED");
        this.stopTaskLoop();
        return;
      }
      let result: string | number | Array<string | number>;
      import("@/services/evaluateCode").then(
        async (module): Promise<void> => {
          result = module.evaluate(
            subtask[1],
            subtask[0]["start"],
            subtask[0]["end"]
          );
          //console.log(result);
          if (
            this.$cookies.isKey("TaskId") &&
            (await taskService.returnSubresult(this.id, subtask[0], result))
          ) {
            this.taskloop();
          } else {
            console.log("STOPPED2");
          }
        }
      );
    },
    startTaskLoop: async function (id: string): Promise<void> {
      if (this.id === id) {
        return;
      }
      const subtask: exSubTask = await taskService.getSubtask(id);
      if (typeof subtask[0].start === "undefined") {
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

    toast(toaster: string | undefined, append = false): void {
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
}
.header1 {
  padding: 5px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3rem;
  font-weight: bold;
}
</style>
