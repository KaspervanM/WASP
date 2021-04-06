<template>
  <div id="app">
    <TheSidebar></TheSidebar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import TheSidebar from "@/components/TheSidebar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    TheSidebar
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
