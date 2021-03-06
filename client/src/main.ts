import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueTyperPlugin from "vue-typer";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueCookies);
Vue.$cookies.config("7d");

Vue.use(VueTyperPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
