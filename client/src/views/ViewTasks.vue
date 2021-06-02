<template>
  <div class="viewtasks">
    <p class="header1" id="title">View Tasks</p>
    <div id="tasks-container">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-number
        last-number
      ></b-pagination>
      <b-table
        :items="tasks"
        :fields="fields"
        :busy="busy"
        :per-page="perPage"
        :current-page="currentPage"
        select-mode="single"
        responsive="sm"
        selectable
        fixed
        hover
        striped
        @row-selected="onRowSelected"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #row-details="row">
          <b-card>
            <div class="description-container">
              <router-link class="butt" :to="`/id/${row.item.id}`"
                ><b-button variant="success" size="sm" class="mr-2">
                  Help this task!
                </b-button></router-link
              >
              <div class="description">
                <p class="header3">Description:</p>
                <p>{{ row.item.description }}</p>
              </div>
            </div>
          </b-card>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
  _showDetails?: boolean;
}
type TaskList = Task[];

export default Vue.extend({
  name: "ViewTasks",
  data(): {
    tasks: TaskList;
    fields: string[];
    perPage: number;
    currentPage: number;
    selected: Task;
    busy: boolean;
  } {
    return {
      tasks: [] as TaskList,
      fields: ["id", "title"],
      perPage: 10,
      currentPage: 1,
      selected: {} as Task,
      busy: true
    };
  },
  watch: {
    selected: function (): void {
      this.tasks.forEach((e: Task) => {
        e._showDetails = false;
      });
      if (!this.selected) {
        return;
      }
      (
        this.tasks.find((task) => task.id === this.selected.id) as Task
      )._showDetails = true;
    }
  },
  computed: {
    rows(): number {
      return this.tasks.length;
    }
  },
  mounted(): void {
    taskService
      .getTasks()
      .then((tasks: TaskList): void => {
        tasks.forEach((e: Task) => {
          delete e.password;
          delete e.config;
          delete e.code;
          delete e.subtasks;
          delete e.result;
          delete e.speed;
          e._showDetails = false;
        });
        this.busy = false;
        this.tasks = tasks;
      })
      .catch((err: string): void => {
        console.error(err);
        this.$bvToast.toast(err, {
          title: "Error!",
          variant: "danger",
          autoHideDelay: 5000
        }); // Toast the error
        this.busy = false;
      });
  },
  methods: {
    onRowSelected(item: Task[]): void {
      this.selected = item[0];
    }
  }
});
</script>

<style lang="scss" scoped>
.viewtasks {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
#title {
  float: left;
  display: inline-flex;
}
#tasks-container {
  padding: 0 4% 0 4%;
}
.description-container {
  text-align: left;
  display: flex;
  flex-flow: row;
  max-height: 20vh;
}
.description-container > * {
  padding-left: 20px;
}
.description-container > .butt {
  min-width: max-content;
  margin: auto;
}
.description {
  flex-grow: 1;
  margin: 0;
  overflow: auto;
}
.description > p {
  margin: 0;
  padding: 0;
}
</style>
