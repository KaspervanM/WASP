<template>
  <div class="TaskStarter">id {{ id }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TaskStarter",
  data(): { id: string } {
    return {
      id: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.$emit("start-task", this.id);
  }
});
</script>
>
