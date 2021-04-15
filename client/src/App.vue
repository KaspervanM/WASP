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
import Vue from "vue";
import TheSidebar from "@/components/TheSidebar.vue";
import taskService from "@/services/taskService";

export default Vue.extend({
  name: "Home",
  components: {
    TheSidebar
  },
  data(): { id: string; code: string; taskInterval: number } {
    return {
      id: "",
      code: "",
      taskInterval: 0
    };
  },
  mounted() {
    if (this.$cookies.isKey("TaskId")) {
      this.startTaskLoop(this.$cookies.get("TaskId"));
    }
  },
  methods: {
    startTaskLoop: async function (id: string) {
      if (this.id === id) {
        return;
      }
      if (typeof (await taskService.getTask(id)).code === "undefined") {
        return;
      }
      this.$cookies.set("TaskId", id);
      this.id = id;

      clearInterval(this.taskInterval);
      this.code = (await taskService.getTask(this.id)).code;
      console.log(this.code);
      this.taskInterval = setInterval(
        function (this: { code: string }) {
          import("@/services/evaluateCode").then((module): void => {
            console.log(module.evaluate(this.code));
          });
        }.bind(this),
        5000
      );
    },
    stopTaskLoop: function () {
      this.$cookies.remove("TaskId");
      this.id = "";
      this.code = "";
      clearInterval(this.taskInterval);
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
