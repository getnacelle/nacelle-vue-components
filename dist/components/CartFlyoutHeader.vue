<template>
  <div class="flyout-cart-header ui-border-bottom">
    <h3>{{title}}</h3>
    <interface-close-button class="close" v-on:close="close" />
  </div>
</template>

<script>
import InterfaceCloseButton from './InterfaceCloseButton'
export default {
  components: {
    InterfaceCloseButton
  },
  props: {
    title: {
      type: String,
      default: 'Your Cart'
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.flyout-cart-header {
  position: relative;
  .close {
    position: absolute;
    right: 2rem;
    top: 1.6rem;
  }
}
h3 {
  text-transform: uppercase;
  font-size: 16pt;
  font-weight: 700;
  text-align: center;
  margin: 1.5rem;
}
</style>
