<template>
  <div class="home">
    <section class="parallax">
      <div id="header-text">
        <p class="header1" id="title">WASP</p>
        <div class="header2">
          A
          <vue-typer
            class="underlined header2"
            :text="specialTextOptions"
            :repeat="Infinity"
            :shuffle="false"
            initial-action="typing"
            :pre-type-delay="80"
            :type-delay="150"
            :pre-erase-delay="2000"
            :erase-delay="60"
            erase-style="backspace"
            :erase-on-complete="false"
            caret-animation="blink"
          ></vue-typer>
        </div>
      </div>
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
  name: "Home",
  data(): { specialTextOptions: Array<string> } {
    return {
      specialTextOptions: [
        "Web Application for Sharing Processes",
        "way to speed up your programs",
        "simple tool",
        "service that works best together",
        "way to help your fellow programmers"
      ]
    };
  }
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
  align-items: left;
  width: 100%;
  height: 100vh;
  background: url("../assets/hide-the-pain-harold-why-you-should-not-use-stock-photos.jpg")
    fixed top/cover;
}
#header-text {
  text-align: left;
  margin-bottom: 10vh;
  margin-left: 20vh;
}
#title {
  padding-bottom: 0;
  margin-bottom: 0;
}
.underlined {
  border-bottom: 3px solid lightgrey;
}
</style>
