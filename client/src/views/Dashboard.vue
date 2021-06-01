<template>
  <div class="dashboard">
    <div id="primary-dashboard">
      <p class="header1" id="title">Dashboard</p>
      <div id="taskRunning" v-if="taskId.length > 0">
        <TheProgressBar
          :id="taskId"
          v-if="taskId.length > 0"
          :key="NaN"
          @task-done="showResults"
        ></TheProgressBar>
        <p>Congratulations: {{ taskId }} is now running!</p>
        <b-button
          class="button"
          variant="danger"
          @click="$emit('remove-cookies')"
          >Click here to make it stop</b-button
        >
      </div>
      <div id="taskRunning" v-else>
        <b-card title="Start running a task" bg-variant="light">
          <p>Your browser is not yet running any code!</p>
          <b-form id="form" @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Task ID:"
              label-for="input-1"
              label-align-sm="left"
              description="Change that by adding a task ID"
              :state="taskState"
              :invalid-feedback="taskInvalidFeedback"
            >
              <b-form-input
                id="input-1"
                v-model="runTaskId"
                type="text"
                :state="taskState"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                aria-describedby="input-live-help input-live-feedback"
                required
              ></b-form-input>
            </b-form-group>

            <div>
              <b-button type="submit" variant="primary">Submit</b-button>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
    <div id="right-sidebar" v-if="taskId.length > 0">
      <div id="task-name">
        <p class="header1">{{ runTask.title }}</p>
      </div>
      <div id="right-subsidebar">{{ runTask.description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheProgressBar from "@/components/TheProgressBar.vue";
import taskService from "@/services/taskService";

interface Subtask {
  start: number;
  end: number;
  finished: boolean;
}
interface Config {
  START: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  PUBLIC_RESULT?: boolean;
  ALLOW_ANONYMOUS_USERS?: boolean;
}

interface Task {
  id: string;
  password?: string;
  title: string;
  description: string;
  config?: Config | string;
  code?: string;
  subtasks?: Subtask[];
  result?: number | string | Array<string | number>;
  speed?: number;
}

export default Vue.extend({
  name: "Dashboard",
  components: { TheProgressBar },
  props: { taskId: String },
  data(): {
    runTask: Task;
    runTaskId: string;
    taskInvalidFeedback: string;
    taskState: boolean;
  } {
    let runTask: Task = {} as Task;
    return {
      runTask,
      runTaskId: "",
      taskState: null as unknown as boolean,
      taskInvalidFeedback:
        "It should be a uuid. Example: 123e4567-e89b-12d3-a456-426614174000"
    };
  },
  mounted(): void {
    taskService
      .getTask(this.taskId)
      .then((task): void => {
        this.runTask = task;
      })
      .catch((err: string): void => {
        console.error(err);
        this.$bvToast.toast(err, {
          title: "Error!",
          variant: "danger",
          autoHideDelay: 5000
        }); // Toast the error
      });
  },
  watch: {
    runTaskId(id): void {
      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          id
        )
      ) {
        this.taskInvalidFeedback =
          "It should be a uuid. Example: 123e4567-e89b-12d3-a456-426614174000";
        this.taskState = false;
        return;
      }
      taskService
        .getTask(id)
        .then(() => {
          this.taskState = true;
        })
        .catch((err): void => {
          this.taskInvalidFeedback = err;
          this.taskState = false;
          return;
        });
    }
  },
  methods: {
    onSubmit: function (event: Event): void {
      event.preventDefault();
      if (this.taskState) {
        this.$router.push("/id/" + this.runTaskId);
      }
    },
    showResults: function (): void {
      this.$router.push("/results");
    }
  }
});
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: auto;
  display: flex;
  align-items: stretch;
}
#primary-dashboard {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
#title {
  float: left;
  display: inline-flex;
}
#right-sidebar {
  display: flex;
  flex-direction: column;
  width: 25vw;
  min-width: 250px;
  max-width: 350px;
}
#right-subsidebar {
  width: 20vw;
  min-width: 200px;
  max-width: 300px;
  flex-grow: 1;
  margin-left: auto;
  order: 2;
  border: 2px solid black;
}
#task-name {
  font-size: 2.5rem;
  text-align: left;
  display: inline-flex;
  border-left: 2px solid blue;
  border-bottom: 2px solid blue;
}
</style>
