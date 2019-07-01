<template>
  <div class="flyout-cart-header">
    <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Your Cart'
    }
  }
}
</script>

<style lang="scss" scoped>
.flyout-cart-header {
  border-bottom: 1px solid #dedede;
}
h3 {
  text-transform: uppercase;
  font-size: 16pt;
  font-weight: 700;
  text-align: center;
  margin: 1.5rem;
}
</style>
