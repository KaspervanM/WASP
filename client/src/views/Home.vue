<template>
  <div class="home">
    <div class="parallax image1"></div>
    <p class="header1" id="title">Home</p>
  </div>
</template>

<script lang="typescript">
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: auto;
}
.parallax {
	min-height: 500px;
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
.image1 {
	background-image: url("../assets/hide-the-pain-harold-why-you-should-not-use-stock-photos.jpg");
	image-orientation: from-image;
}
#title {
  float: left;
  display: inline-flex;
}
