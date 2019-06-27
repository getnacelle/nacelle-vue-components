<template>
  <div>
    <button class="button" @click="addToCart(variant)">Add to Cart</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    image: { type: Object, required: true },
    title: { type: String, required: true },
    variant: { type: Object, required: true },
    quantity: { type: Number, default: 1 },
    productId: { type: String, required: true },
    handle: { type: String, required: true }
  },
  methods: {
    ...mapActions('cart', ['addLineItem']),
    addToCart() {
      let lineItem = {
        image: this.image,
        title: this.title,
        variant: this.variant,
        quantity: this.quantity,
        productId: this.productId,
        handle: this.handle
      }
      this.addLineItem(lineItem)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
