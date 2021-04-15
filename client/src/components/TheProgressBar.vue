<template>
  <b-card title="Progress bar" id="progress-container" bg-variant="light">
    <b-progress id="progress" :max="taskProgress.max">
      <b-progress-bar
        :value="taskProgress.value"
        :label="`${((taskProgress.value / taskProgress.max) * 100).toFixed(
          0
        )}%`"
        show-progress
        animated
      ></b-progress-bar>
    </b-progress>
    <p>Time estimate</p>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

interface TaskProgress {
  value: number;
  max: number;
}

export default Vue.extend({
  name: "TheProgressBar",
  props: { taskId: String },
  data(): { taskProgress: TaskProgress; progressInterval: number } {
    return {
      taskProgress: {
        value: 60,
        max: 100
      },
      progressInterval: 0
    };
  },
  mounted(): void {
    if (this.taskId.length > 0) {
      this.startProgressLoop();
    }
  },
  methods: {
    async startProgressLoop(): Promise<void> {
      this.progressInterval = setInterval(
        async function () {
          this.taskProgress = await taskService.getTaskProgress(this.taskId);
        }.bind(this),
        200
      );
    },
    stopProgressLoop(): void {
      clearInterval(this.progressInterval);
    }
  },
  beforeDestroy(): void {
    this.stopProgressLoop();
  }
});
</script>

<style lang="scss" scoped>
#progress-container {
  display: block;
  margin: 5vh;
  text-align: left;
  #progress {
    height: 3vh;
    margin: 2vh;
  }
}
</style>
