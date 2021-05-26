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
          ><span><b-icon-house-door></b-icon-house-door> Home</span></b-nav-item
        >
        <b-nav-item to="/dashboard" exact exact-active-class="active"
          ><span
            ><b-icon-pie-chart></b-icon-pie-chart> Dashboard</span
          ></b-nav-item
        >
        <b-nav-item to="/viewtasks" exact exact-active-class="active"
          ><span
            ><b-icon-layout-wtf></b-icon-layout-wtf> View Tasks</span
          ></b-nav-item
        >
        <b-nav-item to="/addtask" exact exact-active-class="active"
          ><span><b-icon-pencil></b-icon-pencil> Add Task</span></b-nav-item
        >
        <b-nav-item to="/deletetask" exact exact-active-class="active"
          ><span><b-icon-trash></b-icon-trash> Delete Task</span></b-nav-item
        >
        <b-nav-item to="/about" exact exact-active-class="active"
          ><span><b-icon-people></b-icon-people> About</span></b-nav-item
        >
      </b-nav>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Mobile from "@/services/Mobile";

export default Vue.extend({
  name: "TheSidebar",
  data(): { visible: boolean } {
    return {
      visible: true
    };
  },
  mounted(): void {
    this.visible = !this.isMobile();
  },
  watch: {
    $route(): void {
      this.hideSidebar();
    }
  },
  methods: {
    hideSidebar(): void {
      if (this.isMobile()) this.visible = false;
    },
    isMobile: Mobile.isMobile
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
  z-index: 10;
}
.notcollapsed {
  display: none;
}
.sidebar {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: sticky;
  width: 20vw;
  min-width: 200px;
  max-width: 300px;
  min-height: 100vh;
  background-color: lightgrey;
  left: 0;
  top: 0;
}
.bd-sidebar {
  width: 100%;
  text-align: left;
  span {
    margin-left: 15px;
  }
}
.nav-item {
  margin-left: 5px;
}
.mobile {
  position: absolute;
  width: 100vw;
  z-index: 10;
}
.collapsing {
  -webkit-transition: none !important;
  transition: none !important;
  display: none;
}
</style>
