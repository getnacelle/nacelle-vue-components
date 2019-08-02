<template>
  <div>
    <button
      class="button is-primary"
      :disabled="!allOptionsSelected"
      @click="addToCart"
      v-if="this.$parent.$options._componentTag == 'product-variant-select'"
    >
      <span v-if="!variantInLineItems && !allOptionsSelected">Select Options</span>
      <span v-if="!variantInLineItems && allOptionsSelected">Add to Cart</span>
      <span v-if="variantInLineItems">Added!</span>
    </button>
    <button class="button is-primary" @click="addToCart" v-else>
      <span v-if="!variantInLineItems">Add to Cart</span>
      <span v-else>Added!</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import find from 'lodash.find'
export default {
  props: {
    product: {
      type: Object
    },
    quantity: { type: Number, default: 1 }
  },

  computed: {
    ...mapState('cart', ['lineItems']),
    ...mapGetters('product', ['allOptionsSelected']),
    ...mapGetters('product', ['onlyOneOption']),
    ...mapState('product', ['selectedVariant']),
    variant() {
      if (this.onlyOneOption) {
        return this.product.variants[0]
      } else {
        return this.selectedVariant
      }
    },
    variantInLineItems() {
      let vm = this
      if (vm.variant != null) {
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
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapActions('cart', [
      'addLineItem',
      'removeLineItem',
      'incrementLineItem',
      'decrementLineItem',
      'getLineItems'
    ]),
    ...mapMutations('product', ['setProduct', 'showOptionsModal']),
    addToCart() {
      this.setProduct(this.product)
      if (this.allOptionsSelected) {
        let lineItem = {
          image: this.product.featuredMedia,
          title: this.product.title,
          variant: this.selectedVariant,
          quantity: this.quantity,
          productId: this.product.id,
          handle: this.product.handle
        }
        this.addLineItem(lineItem)
      } else {
        this.showOptionsModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
