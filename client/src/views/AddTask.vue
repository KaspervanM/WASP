<template>
  <div class="addtask">
    <p class="header1" id="title">Add Task</p>
    <b-container
      title="Submit a new task"
      id="form-container"
      bg-variant="light"
    >
      <b-form id="form" @submit="onSubmit" @reset="onReset">
        <div class="input-block">
          <b-form-group
            id="input-group-1"
            class="block-elem"
            label="Task title:"
            label-for="input-1"
            label-align-sm="left"
            description="A good title for your task may help attract more users."
          >
            <b-form-input
              id="input-1"
              v-model="task.title"
              type="text"
              @input="showSuccessAlert = showErrorAlert = false"
              placeholder="Enter title"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            class="block-elem"
            label="Task password:"
            label-for="input-2"
            label-align-sm="left"
            description="Use this password if you want to see the results if private is set to true."
          >
            <b-form-input
              id="input-2"
              v-model="task.password"
              type="password"
              @input="showSuccessAlert = showErrorAlert = false"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="input-block">
          <b-form-group
            id="input-group-3"
            class="block-elem"
            label="Task Description:"
            label-for="input-3"
            label-align-sm="left"
          >
            <b-form-textarea
              id="input-3"
              v-model="task.description"
              placeholder="Enter description"
              rows="8"
              no-resize
              required
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            id="input-group-4"
            class="block-elem"
            label="Task Configuration:"
            label-for="input-4"
            label-align-sm="left"
          >
            <b-form-textarea
              id="input-4"
              v-model="task.config"
              placeholder="Enter configuration"
              rows="8"
              no-resize
              required
            ></b-form-textarea>
          </b-form-group>
          <b-tooltip
            custom-class="custom-tooltip"
            target="input-group-4"
            triggers="focus"
          >
            <pre>{{ tooltip }}</pre>
          </b-tooltip>
        </div>
        <div id="input-group-5">
          <label>Your code:</label>
          <b-form-textarea
            id="input-5"
            v-model="code"
            placeholder="Enter code"
            ref="ta"
            @keydown.native.tab.exact.prevent="tab"
            max-rows="100"
            no-resize
            required
          ></b-form-textarea>
        </div>
        <b-alert
          id="code-alert"
          :show="!!errors.length"
          style="z-index: 2000"
          variant="warning"
        >
          <div v-for="err in errors" :key="err">
            {{ err }}
          </div>
        </b-alert>
        <br />
        <div>
          <b-button class="button" type="submit" variant="primary"
            >Submit</b-button
          >
          <b-button class="button" type="reset" variant="danger"
            >Reset</b-button
          >
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

interface Task {
  id: string;
  password: string;
  title: string;
  description: string;
  config: string;
  code: string;
}

let task: Task = {
  id: "", //To be filled by server
  password: "", //To be filled by user/server
  title: "", //To be filled by user
  description: "", //To be filled by user
  config: "",
  code: "" //To be filled by user
};
export default Vue.extend({
  name: "AddTask",
  data(): {
    code: string;
    codeChecks: Array<string>;
    errors: Array<string>;
    task: Task;
    tooltip: string;
    isValid: boolean;
  } {
    return {
      code: "",
      codeChecks: [
        "window",
        "document",
        "console",
        "alert",
        "prompt",
        "confirm",
        "eval",
        "import",
        "export",
        "XMLHttpRequest",
        "fetch"
      ],
      errors: [],
      task,
      tooltip: `interface Config {
  START: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  PUBLIC_RESULT?: boolean;
  ALLOW_ANONYMOUS_USERS?: boolean;
}`,
      isValid: true
    };
  },
  mounted() {
    this.task.config = `{
  "START": 0,
  "END": 10,
  "BATCH_SIZE": 1,
  "RESULT": "sum",
  "PUBLIC_RESULT": false,
  "ALLOW_ANONYMOUS_USERS": true
}`;
  },
  watch: {
    code: function (): void {
      this.errors = [];
      for (let i = 0; i < this.codeChecks.length; i++) {
        if (this.contains(this.codeChecks[i])) {
          this.errors.push("Hey, " + this.codeChecks[i] + " is forbidden!");
        }
      }
      if (this.errors.length === 0) {
        this.isValid = true;
        this.task.code = this.code;
        return;
      }
      this.isValid = false;
      return;
    }
  },
  methods: {
    createToast: function (err: string): void {
      this.$bvToast.toast(err, {
        title: "Error!",
        variant: "danger",
        autoHideDelay: 5000
      }); // Toast the error
    },
    contains: function (
      toFind: string,
      indexList: Array<number> = []
    ): boolean {
      const len: number = indexList.length;
      const code: string = this.code; //.replace(/\s|\r?\n|\r/g, "");
      if (indexList[len - 1] === 0) {
        indexList.pop();
        for (let i = 0; i < len; i++) {
          // Needs to be changed, this is a bad way of checking
          if (code[indexList[i] - 2] === "\\") {
            indexList.splice(i, 1);
          }
        }
        return indexList.length > 0;
      }
      return this.contains(
        toFind,
        indexList.concat([
          code.indexOf(toFind, len > 0 ? indexList[len - 1] : 0) + 1
        ])
      );
    },
    onSubmit: function (event: Event): void {
      event.preventDefault();
      if (!this.isValid) {
        return this.createToast("There are still errors in your code.");
      }
      taskService
        .addTask(this.task)
        .then((id: string): void => {
          this.task.id = id;
          console.log(`Created task with id: ${id}`);
          this.$bvToast.toast(
            `Task with ID: ${id} created succesfully! Click here to view your task`,
            {
              to: "/id/" + id,
              title: "Success!",
              variant: "success",
              autoHideDelay: 5000
            }
          ); // Toast the success
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
    onReset(event: Event): void {
      event.preventDefault();
      // Reset our form values
      this.task.password = "";
      this.task.title = "";
      this.task.description = "";
      this.task.config = "";
      this.task.code = "";
      this.code = "";
    },
    tab(): void {
      const index: number = ((this as unknown) as {
        $refs: {
          ta: HTMLInputElement;
        };
      }).$refs.ta.selectionStart as number;
      this.code = this.code.slice(0, index) + "\t" + this.code.slice(index);
      this.$nextTick((): void => {
        ((this as unknown) as {
          $refs: {
            ta: HTMLInputElement;
          };
        }).$refs.ta.setSelectionRange(index + 1, index + 1);
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.addtask {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
#title {
  float: left;
  display: inline-flex;
}
#form-container {
  flex-grow: 1;
  #form {
    display: flex;
    flex-direction: column;
    height: 95%;
    width: 100%;
  }
}
.input-block {
  display: flex;
}
.block-elem {
  flex-grow: 1;
  margin-left: 5px;
  height: 100%;
}
.custom-tooltip pre {
  text-align: left;
  color: whitesmoke;
}

#input-group-5 {
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
#input-5 {
  flex-grow: 1;
  max-height: 95vh;
}
#code-alert {
  margin: 10px;
}
.button {
  margin: 5px;
}
</style>
