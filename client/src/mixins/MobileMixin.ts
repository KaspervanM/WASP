import Vue from "vue";

export default Vue.extend({
  methods: {
    isMobile: function (): boolean {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
  }
});
