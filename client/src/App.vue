<template>
  <div id="app">
    <TheSidebar></TheSidebar>
    <router-view @start-task="startTaskLoop" :task-id="id" />
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
  methods: {
    startTaskLoop: async function (id: string) {
      if (this.id === id) {
        return;
      }
      this.id = id;

      clearInterval(this.taskInterval);
      this.code = (await taskService.getTask(this.id)).code;
      console.log(this.code);
      this.taskInterval = setInterval(
        function () {
          import("@/services/evaluateCode").then((module) => {
            console.log(module.evaluate(this.code));
          });
        }.bind(this),
        5000
      );
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
