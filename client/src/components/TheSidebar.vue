<template>
  <div>
    <b-button
      :class="['menu-button', visible ? 'notcollapsed' : 'collapsed']"
      aria-controls="sidebar"
      @click="visible = !visible"
    >
      <b-icon icon="layout-text-sidebar" aria-hidden="true"></b-icon>
    </b-button>
    <b-collapse v-model="visible" :class="['sidebar', { mobile: isMobile() }]">
      <b-img
        class="wasplogo"
        :src="require('../assets/logo.png')"
        alt="WASP logo"
        width="100%"
      ></b-img>
      <b-nav class="bd-sidebar" vertical pills @click="hideSidebar()">
        <b-nav-item to="/" exact exact-active-class="active"
          >Dashboard</b-nav-item
        >
        <b-nav-item to="/about" exact exact-active-class="active"
          >About</b-nav-item
        >
      </b-nav>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MobileMixin from "@/mixins/MobileMixin";

export default Vue.extend({
  name: "Welcome",
  mixins: [MobileMixin],
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    this.visible = !this.isMobile();
    console.log(this.isMobile());
    console.log(this.visible);
  },
  watch: {
    $route(to, from) {
      this.hideSidebar();
    }
  },
  methods: {
    hideSidebar: function () {
      if (this.isMobile()) this.visible = false;
    }
  }
});
</script>

<style scoped lang="scss">
.wasplogo {
  padding: 10px;
}
.menu-button {
  position: absolute;
  left: 0;
}
.notcollapsed {
  display: none;
}
.sidebar {
  position: absolute;
  width: 20vw;
  min-width: 200px;
  max-width: 300px;
  height: 100vh;
  background-color: lightgrey;
  left: 0;
}
.mobile {
  width: 100vw;
}
.collapsing {
  transition: none !important;
}
</style>
