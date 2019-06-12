<template>
  <img class="loader" src="../assets/loader.svg">
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
.loader {
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
</style>
