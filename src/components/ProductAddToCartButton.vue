<template>
  <div>
    <button
      class="button is-primary"
      :disabled="!allSelected"
      @click="addToCart"
      v-if="this.$parent.$options._componentTag == 'product-variant-select'"
    >
      <span v-if="!variantInLineItems && !allSelected">Select Options</span>
      <span v-if="!variantInLineItems && allSelected">Add to Cart</span>
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
    variant: {
      type: Object
    },
    quantity: { type: Number, default: 1 },
    allOptionsSelected: { type: Boolean, default: false },
    confirmedSelection: { type: Boolean, default: false }
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
    },
    allSelected() {
      if (
        this.product.options &&
        this.product.options.length == 1 &&
        this.product.options[0].values.length == 1
      ) {
        return true
      } else if (this.allOptionsSelected) {
        return true
      } else {
        return false
      }
    }
  },

  watch: {
    confirmedSelection(value) {
      if (value == true) {
        this.addToCart()
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
    addToCart() {
      if (this.allSelected) {
        let lineItem = {
          image: this.product.image,
          title: this.product.title,
          variant: this.variant,
          quantity: this.quantity,
          productId: this.product.id,
          handle: this.product.handle
        }
        this.addLineItem(lineItem)
      } else {
        this.$emit('needsOptionsSelected')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
