<template>
  <div>
    <button class="button is-primary" @click="addToCart">
      <span v-if="!variantInLineItems">Add to Cart</span>
      <span v-else>Added!</span>
    </button>
    <!-- <button @click="incrementLineItem(variant.id)">increment</button>
    <button @click="decrementLineItem(variant.id)">decrement</button>
    <button @click="removeLineItem(variant.id)">remove</button>-->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import find from 'lodash.find'
export default {
  props: {
    image: { type: Object, required: true },
    title: { type: String, required: true },
    variant: { type: Object, required: true },
    quantity: { type: Number, default: 1 },
    productId: { type: String, required: true },
    handle: { type: String, required: true }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    variantInLineItems() {
      let vm = this
      let lineItem = vm.lineItems.findIndex(lineItem => {
        if (vm.variant.id) {
          return lineItem.variant.id == vm.variant.id
        }
      })
      if (lineItem != -1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('cart', ['addLineItem']),
    ...mapActions('cart', ['removeLineItem']),
    ...mapActions('cart', ['incrementLineItem']),
    ...mapActions('cart', ['decrementLineItem']),
    ...mapActions('cart', ['getLineItems']),
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
