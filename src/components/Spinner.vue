<template>
  <img class="loading-spinner" :src="loaderSvg">
</template>

<script>
export default {
  props: {
    loaderSvg: {
      type: String,
      default:
        'https://nacelle-dev.s3-us-west-2.amazonaws.com/nacelle-loader.svg'
    }
  }
}
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
.loading-spinner {
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
</style>
