<template>
  <b-sidebar visible no-header no-close-on-route-change="true">
    <b-img
      class="wasplogo"
      :src="require('../assets/logo.png')"
      alt="WASP logo"
      width="100%"
    ></b-img>
    <b-nav class="text-center" vertical pills>
      <b-nav-item to="/" exact exact-active-class="active"
        >Dashboard</b-nav-item
      >
      <b-nav-item to="/about" exact exact-active-class="active"
        >About</b-nav-item
      >
    </b-nav>
  </b-sidebar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Welcome",
  data() {
    return {
      logoWidth: 20
    };
  }
});
</script>

<style scoped lang="scss">
.wasplogo {
  padding: 10px;
}
</style>
