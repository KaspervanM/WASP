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
          <div id="config-container" class="block-elem">
            <b-form-group
              id="input-group-4"
              label="Task Configuration:"
              label-for="input-4"
              label-align-sm="left"
            >
              <b-form-textarea
                id="input-4"
                v-model="config"
                placeholder="Enter configuration"
                rows="8"
                no-resize
                required
              ></b-form-textarea>
            </b-form-group>
            <b-alert
              id="config-alert"
              :show="!!configErrors.length"
              variant="warning"
            >
              <div v-for="err in configErrors" :key="err">
                {{ err }}
              </div>
            </b-alert>
            <b-tooltip
              custom-class="custom-tooltip"
              target="input-group-4"
              triggers="focus"
            >
              <pre>{{ tooltip }}</pre>
            </b-tooltip>
          </div>
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
        <b-alert id="code-alert" :show="!!codeErrors.length" variant="warning">
          <div v-for="err in codeErrors" :key="err">
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
    config: string;
    codeChecks: Array<string>;
    codeErrors: Array<string>;
    configChecks1: Array<Array<string>>;
    configChecks2: Array<Array<string>>;
    configErrors: Array<string>;
    task: Task;
    tooltip: string;
  } {
    return {
      code: "",
      config: `{
  "START": 0,
  "END": 10,
  "BATCH_SIZE": 1,
  "RESULT": "sum",
  "PUBLIC_RESULT": false,
  "ALLOW_ANONYMOUS_USERS": true
}`,
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
      codeErrors: [],
      configChecks1: [
        ["START", "number"],
        ["END", "number"],
        ["BATCH_SIZE", "number"],
        ["RESULT", "string"],
        ["PUBLIC_RESULT", "boolean"]
      ],
      configChecks2: [["ALLOW_ANONYMOUS_USERS", "boolean"]],
      configErrors: [],
      task,
      tooltip: `interface Config {
  START: number;
  END: number;
  BATCH_SIZE: number;
  RESULT: string;
  PUBLIC_RESULT: boolean;
  ALLOW_ANONYMOUS_USERS?: boolean;
}`
    };
  },
  mounted() {
    this.task.config = this.config;
  },
  watch: {
    code: function (): void {
      this.codeErrors = [];
      for (let i = 0; i < this.codeChecks.length; i++) {
        if (this.contains(this.codeChecks[i])) {
          this.codeErrors.push("Hey, " + this.codeChecks[i] + " is forbidden!");
        }
      }
      if (this.codeErrors.length === 0) {
        this.task.code = this.code;
      }
      return;
    },
    config: function () {
      this.configErrors = [];
      try {
        const config = JSON.parse(this.config);
        const keys: Array<string> = Object.keys(config);
        const concatenated = this.configChecks1.concat(this.configChecks2);
        for (let i = 0; i < keys.length; i++) {
          let index = -1;
          concatenated.forEach(function (item, indx) {
            if (item[0] === keys[i]) {
              index = indx;
              return;
            }
          });
          if (index === -1) {
            this.configErrors.push(keys[i] + " is an invalid key!");
          } else if (typeof config[keys[i]] !== concatenated[index][1]) {
            this.configErrors.push(keys[i] + " has an invalid type!");
          }
        }
        for (let i = 0; i < this.configChecks1.length; i++) {
          if (!keys.includes(this.configChecks1[i][0])) {
            this.configErrors.push(this.configChecks1[i][0] + " is missing!");
          }
        }
      } catch (err) {
        this.configErrors.push(err);
      }
      if (this.configErrors.length === 0) {
        this.task.config = this.config;
      }
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
    evaluateCode: function (): Promise<string> {
      const code: string = this.code;
      const task: Task = this.task;
      const createToast: (err: string) => void = this.createToast;
      return new Promise(function (resolve, reject) {
        import("@/services/evaluateCode")
          .then((module): void => {
            module
              .evaluate(
                code,
                JSON.parse(task.config)["START"],
                JSON.parse(task.config)["START"] + 1
              )
              .then((): void => {
                resolve("No errors");
              })
              .catch((err: string): void => {
                reject(err);
              });
          })
          .catch((err: Error): void => {
            console.error(err); // Log the real error
            createToast(
              "An error occurred while importing the evaluateCode module!"
            ); // Toast the error
          });
      });
    },
    checkType: function (
      res: string | number | Array<string | number>
    ): boolean {
      // To be fixed
      if (JSON.parse(task.config)["RESULT"] === "sum") {
        if (typeof res !== "number") {
          if (typeof res === "string") {
            if (isNaN(parseInt(res))) {
              return false;
            }
            return true;
          }
          return false;
        }
        return true;
      }
      return true;
    },
    onSubmit: function (event: Event): void {
      event.preventDefault();
      if (this.configErrors.length) {
        return this.createToast("There are still errors in your config.");
      }
      if (this.codeErrors.length) {
        return this.createToast("There are still errors in your code.");
      }
      this.evaluateCode()
        .then((res: string | number | Array<string | number>) => {
          if (!this.checkType(res)) {
            console.error("Wrong return type in main.");
            return this.codeErrors.push("Wrong return type in main.");
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
              this.createToast(err); // Toast the error
            });
        })
        .catch((err) => {
          console.error(err);
          this.codeErrors.push(err);
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
