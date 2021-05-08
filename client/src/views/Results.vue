<template>
  <div class="results">
    <p class="header1">Thank you for helping this task!</p>
    <p>This task is now complete: {{ taskId }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Results",
  props: { taskId: String }
});
</script>

<style lang="scss"></style>
