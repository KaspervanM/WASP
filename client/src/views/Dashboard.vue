<template>
  <div class="dashboard">
    <p class="header1" id="title">Dashboard</p>
    <p class="header1" id="task-name">Task name</p>
    {{ taskId }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Dashboard",
  components: {},
  props: { taskId: String }
});
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100vh;
}
#title {
  float: left;
  display: inline-flex;
}
#task-name {
  width: 25%;
  font-size: 2.5rem;
  text-align: left;
  float: right;
  display: inline-flex;
  border-bottom: 2px solid blue;
  border-left: 2px solid blue;
}
</style>
