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
        <div class="section-block">
          <p class="header2">What is WASP?</p>
          <p>
            WASP is a web service that makes your parallel processes be
            completed faster. It enables you to run your code without using any
            resources on your device. WASP accomplishes this by running the
            process in the browsers of users of this site. So, upload your code
            and send a link to your friends.
          </p>
        </div>
        <div class="section-block" id="diagram1"></div>
      </section>
      <section>
        <div class="section-block">
          <p class="header2">Why use it?</p>
          <p>
            WASP can be used regardless of your device. Where you would have
            needed a monster pc, with WASP you just need friends with an
            internet connection.
          </p>
          <p>
            Some processes can make your computer run slowely and prevent you
            from doing anything else. With WASP this is no longer the case.
          </p>
        </div>
        <div class="section-block">
          <p class="header2">An example</p>
          <p>
            The calculation of thousands of digits of pi is known to be very
            arduous for a computer and take a long time. With WASP, however this
            is no longer the case. Just upload the code and ask your friends to
            help. When the process has finished, you can download the code and
            see the result.
            <i
              >View <a href="/about">this</a> page for an example of the
              code.</i
            >
          </p>
        </div>
      </section>
      <br />
      <br />
      <section>
        <div class="section-block" id="explanation">
          <p class="header2">How to use this site</p>
          <p>
            <i
              >To read the in-depth guide about how to upload your code, go to
              <a href="/about">this</a> page. To read the in-depth guide about
              how to help processes, go to <a href="/about">this</a> page.</i
            >
          </p>
          <p class="header3">Prerequisites</p>
          <ul>
            <li>The code must be written in Javascript.</li>
          </ul>
        </div>
      </section>
      <br />
      <br />
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
section {
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: left;
}
.section-block {
  display: flex;
  flex-flow: column nowrap;
  justify-content: left;
  align-items: left;
  width: 40%;
  margin: 10px 5% 10px 5%;
  text-align: left;
}
#diagram1 {
  background: url("../assets/Diagram1.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  min-height: 300px;
}
#explanation {
  width: 100%;
}
</style>
