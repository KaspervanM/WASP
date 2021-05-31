<template>
  <div class="TaskStarter">id {{ $route.params.id }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TaskStarter",
  created(): void {
    this.$emit("start-task", this.$route.params.id);
    this.$router.push("/dashboard");
  }
});
</script>
