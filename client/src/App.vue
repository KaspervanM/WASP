<template>
  <div id="app">
    {{ id }}
    <TheSidebar></TheSidebar>
    <router-view @start-task="startTaskLoop" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import TheSidebar from "@/components/TheSidebar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    TheSidebar
  },
  data(): { id: string; taskInterval: number } {
    return {
      id: "",
      taskInterval: 0
    };
  },
  methods: {
    startTaskLoop: function (id: string) {
      if (this.id === id) {
        return;
      }
      clearInterval(this.taskInterval);
      this.id = id;
      this.taskInterval = setInterval(
        function () {
          import("@/services/evaluateCode").then((module) => {
            console.log(
              module.evaluate(
                'function test() {\n\treturn "Congratulations! WASP is working correctly: ' +
                  this.id +
                  '!";\n}\ntest();\n'
              )
            );
          });
        }.bind(this),
        2000
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
