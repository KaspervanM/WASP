<template>
  <div class="home">
    <section class="parallax">
      <p class="header1" id="title">Web Application for Sharing Processes</p>
    </section>
    <main>
      <section>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
        <p>haha</p>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home"
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
.parallax {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url("../assets/hide-the-pain-harold-why-you-should-not-use-stock-photos.jpg")
    fixed top/cover;
}
#title {
  display: inline-flex;
}
</style>
