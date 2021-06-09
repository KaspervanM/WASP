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
              maxlength="40"
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
              maxlength="100"
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
              maxlength="1000"
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
              placement="left"
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
            maxlength="50000"
            no-resize
            required
          ></b-form-textarea>
          <label>Or upload a file:</label>
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
            accept=".js"
          />
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

export default Vue.extend({
  name: "AddTask",
  data(): {
    code: string;
    config: string;
    codeChecks: Array<string>;
    codeErrors: Array<string>;
    configChecks1: Array<Array<string>>;
    configErrors: Array<string>;
    file: File;
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
  "REQ_TIMEOUT": 120
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
        ["PUBLIC_RESULT", "boolean"],
        ["REQ_TIMEOUT", "number"]
      ],
      configErrors: [],
      task: {} as Task,
      file: new File([], ""),
      tooltip: `{
  "START": 0 | 1 | 2 | 3 | ...;
  "END": START + 0 | 1 | 2 | 3 | ...;
  "BATCH_SIZE": 1 | 2 | 3 | ...;
  "RESULT": "sum" | "bigsum" | "string" | "array";
  "PUBLIC_RESULT": true | false;
  "REQ_TIMEOUT": 0 | 1 | 2 | 3 | ... (in seconds);
}`
    };
  },
  mounted() {
    this.task.config = this.config;
  },
  watch: {
    code: function (): void {
      this.codeErrors = [];
      const regex = new RegExp(this.codeChecks.join("|"), "g");
      const found: RegExpMatchArray | null = this.code.match(regex);
      if (!found) {
        this.task.code = this.code;
        return;
      }
      found.forEach((item) => {
        this.codeErrors.push("Hey, " + item + " is forbidden!");
      });
    },
    config: function () {
      this.configErrors = [];
      try {
        const config = JSON.parse(this.config);
        const keys: Array<string> = Object.keys(config);
        for (let i = 0; i < keys.length; i++) {
          let index = -1;
          this.configChecks1.forEach(function (item, indx) {
            if (item[0] === keys[i]) {
              index = indx;
              return;
            }
          });
          if (index === -1) {
            this.configErrors.push(keys[i] + " is an invalid key!");
          } else if (typeof config[keys[i]] !== this.configChecks1[index][1]) {
            this.configErrors.push(keys[i] + " has an invalid type!");
          }
        }
        for (let i = 0; i < this.configChecks1.length; i++) {
          if (!keys.includes(this.configChecks1[i][0])) {
            this.configErrors.push(this.configChecks1[i][0] + " is missing!");
          }
        }
        if (keys.includes("BATCH_SIZE")) {
          if (config["BATCH_SIZE"] < 1) {
            this.configErrors.push(
              "Invalid batch size! It should be equal or greater than 1."
            );
          }
        }
        if (keys.includes("START") && keys.includes("END")) {
          if (config["END"] < config["START"]) {
            this.configErrors.push(
              "Invalid END! It should be equal or greater than START."
            );
          }
        }
        if (keys.includes("RESULT")) {
          switch (config["RESULT"]) {
            case "sum":
            case "bigsum":
            case "string":
            case "array":
              break;
            default:
              this.configErrors.push(
                'This result type is not accepted! Use "sum", "string" of "array".'
              );
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
    errorHandler: function (e: ProgressEvent<FileReader>): void {
      const err = (e.target as FileReader).error as DOMException;
      switch (err.code) {
        case 1:
          return this.createToast("The file does not exist.");
        case 2:
          return this.createToast(
            "Unspecified security issues prevent the browser from reading the file."
          );
        case 3:
          return this.createToast("The attempt to read the file was aborted.");
        case 4:
          return this.createToast(
            "The file is not readable, perhaps because its permissions have changed or because another process has locked it."
          );
        default:
          this.createToast("An error occurred reading this file.");
      }
    },
    handleFileUpload: function () {
      this.file = (
        this as unknown as { $refs: { file: { files: FileList } } }
      ).$refs.file.files[0];
      var reader = new FileReader();
      reader.onerror = this.errorHandler;
      reader.onload = function (
        this: { code: string },
        e: ProgressEvent<FileReader>
      ): void {
        (this as unknown as { code: string }).code = (e.target as FileReader)
          .result as string;
      }.bind(this as unknown as { code: string });
      reader.readAsText(this.file);
    },
    evaluateCode: function (): Promise<string> {
      const code: string = this.code;
      const task: Task = this.task;
      const checkType: (res: string | number | (string | number)[]) => boolean =
        this.checkType;
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
              .then((res: string | number | Array<string | number>): void => {
                if (!checkType(res)) {
                  return reject("Wrong return type in main.");
                }
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
      if (JSON.parse(this.task.config)["RESULT"] === "sum") {
        if (typeof res !== "number") {
          if (typeof res === "string") {
            if (isNaN(parseFloat(res))) {
              return false;
            }
            return true;
          }
          return false;
        }
        return true;
      }
      if (JSON.parse(this.task.config)["RESULT"] === "bigsum") {
        if (typeof res !== "bigint") {
          if (typeof res === "string") {
            try {
              BigInt(res);
            } catch (err) {
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
        .then(() => {
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
        .catch((err: string) => {
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
    tab(): void {
      const index: number = (
        this as unknown as {
          $refs: {
            ta: HTMLInputElement;
          };
        }
      ).$refs.ta.selectionStart as number;
      this.code = this.code.slice(0, index) + "\t" + this.code.slice(index);
      this.$nextTick((): void => {
        (
          this as unknown as {
            $refs: {
              ta: HTMLInputElement;
            };
          }
        ).$refs.ta.setSelectionRange(index + 1, index + 1);
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
