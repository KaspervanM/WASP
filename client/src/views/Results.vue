<template>
  <div class="results">
    <p class="header1">Thank you for helping this task!</p>
    <p>This task is now complete: {{ taskId }}</p>
    <div class="button-container">
      <b-button variant="outline-success" @click="returnResults"
        >Give me the results!</b-button
      >
      <b-button variant="outline-danger" @click="leaveResultsPage"
        >Leave this task</b-button
      >
      <b-modal
        id="password-prompt"
        v-model="showPrompt"
        ref="modal"
        title="Enter Password"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="onSubmit">
          <b-form-group
            label="Password"
            label-for="password-input"
            invalid-feedback="Password is required"
            :state="nameState"
          >
            <b-form-input
              id="password-input"
              type="password"
              v-model="password"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import taskService from "@/services/taskService";

export default Vue.extend({
  name: "Results",
  data(): { showPrompt: boolean; password: string; nameState: any } {
    return {
      showPrompt: false,
      password: "",
      nameState: null
    };
  },
  props: { taskId: String },
  created() {
    if (!this.$cookies.isKey("TaskId")) {
      this.$router.push("/");
    }
  },
  methods: {
    returnResults: function (): void {
      this.showPrompt = true;
    },
    onSubmit: function () {
      if (!this.checkFormValidity()) {
        return;
      }
      const id = this.taskId;
      const pass = this.password;
      taskService
        .downloadResult(id, pass)
        .then((response) => {
          const blob = new Blob([JSON.stringify(response.data)], {
            type: "application/plain"
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = id.toString() + ".json";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(() => {
          console.error;
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.password = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.onSubmit();
    },
    leaveResultsPage: function () {
      this.$emit("remove-cookies");
      this.$router.push("/");
    }
  }
});
</script>

<style lang="scss">
.button-container {
  display: block;
}
.button-container > * {
  margin: 5px;
}
</style>
