<template>
    <div class="cookies" style="display: none">
    <p>
    By using our website, you agree to our cookie policy.
    </p>
    <button class=’close’>&times;</button>
    <p>Some text before<p>
<div class="target">
<p>
Click to fade
</p>
</div>
</template>    


<script lang="ts">
  const target = document.getElementById("cookies");
  target.addEventListener('click', () => target.style.opacity = '0');
  target.addEventListener('transitionend', () => target.remove());

</script>

<style scoped lang="scss">
#target {
    height: 100px;
    background-color: red;
    transition: opacity 1s;
}

.cookies {
  position: fixed;
  bottom: 40px;
  left: 10%;
  right: 10%;
  width: 80%;
  padding: 5px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
.close {
  height: 20px;
  background-color: #777;
  border: none;
  color: white;
  border-radius: 2px;
  cursor: pointer;
}
</style>