<template>
  <div>
    <button @click="addToCart(variant)">Add to Cart!</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    image: { type: String, required: true },
    title: { type: String, required: true },
    variant: { type: Object, required: true },
    quantity: { type: Number, default: 1 },
    productId: { type: String, required: true },
    handle: { type: String, required: true }
  },
  methods: {
    addToCart() {
      console.log('added to cart!')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
