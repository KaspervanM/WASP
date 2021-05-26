<template>
  <div class="home">
    <div class="parallax image1"></div>
    <p class="header1" id="title">Home</p>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.dashboard {
  border: 2px solid tomato;
  width: 100%;
  height: auto;
}
.parallax {
  border: 2px solid orange;
  width: 100%;
  min-height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.image1 {
  border: 2px solid teal;
  background-image: url("../assets/hide-the-pain-harold-why-you-should-not-use-stock-photos.jpg");
  image-orientation: from-image;
}
#title {
  border: 2px solid khaki;
  float: left;
  display: inline-flex;
}
</style>
