<template>
  <b-card title="Progress" id="progress-container" bg-variant="light">
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
    <p>
      Time estimate: {{ new Date(timeLeft * 1000).toISOString().substr(11, 8) }}
    </p>
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
  props: { id: String },
  data(): {
    taskProgress: TaskProgress;
    timeLeft: number;
    progressInterval: number;
  } {
    return {
      taskProgress: {
        value: 0.0,
        max: 100
      },
      timeLeft: 0,
      progressInterval: 0
    };
  },
  mounted(): void {
    if (this.id.length > 0) {
      this.startProgressLoop();
    }
  },
  watch: {
    taskProgress: function () {
      if (this.taskProgress.value === this.taskProgress.max) {
        console.log("done");
        this.$emit("task-done");
      }
    }
  },
  methods: {
    startProgressLoop(): void {
      this.progressInterval = setInterval(
        function (this: {
          taskProgress: TaskProgress;
          timeLeft: number;
          id: string;
        }): void {
          taskService
            .getTaskProgress(this.id)
            .then((res: [TaskProgress, number]): void => {
              this.taskProgress = res[0];
              this.timeLeft = res[1];
            })
            .catch((err: string): void => {
              console.error(err);
            });
        }.bind(this),
        1000
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
