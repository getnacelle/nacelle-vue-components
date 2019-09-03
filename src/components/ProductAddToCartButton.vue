<template>
  <div>
    <button
      class="add-to-cart-button button is-primary nacelle"
      :disabled="!allOptionsSelected || allOptionsSelected && variant == undefined || !variantInLineItems && allOptionsSelected && variant.availableForSale != true"
      @click="addToCart"
      v-if="this.$parent.$options._componentTag == 'product-variant-select'"
    >
      <span v-if="!variantInLineItems && !allOptionsSelected">Select Options</span>
      <span
        v-if="!variantInLineItems && allOptionsSelected && variant == undefined || !variantInLineItems && allOptionsSelected && variant.availableForSale != true"
      >Select Different Options</span>
      <span
        v-if="!variantInLineItems && allOptionsSelected && variant && variant.availableForSale == true"
      >Add to Cart</span>
      <span v-if="variantInLineItems">Added!</span>
    </button>
    <button class="button is-primary" @click="addToCart" v-else>
      <span v-if="!onlyOneOption">Select Options</span>
      <span v-if="onlyOneOption && !variantInLineItems">Add to Cart</span>
      <span v-if="onlyOneOption &&variantInLineItems">Added!</span>
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
    confirmedSelection: { type: Boolean, default: false },
    onlyOneOption: { type: Boolean, default: false }
  },

  computed: {
    ...mapState('cart', ['lineItems']),
    variantInLineItems() {
      let vm = this
      if (vm.variant != null) {
        let lineItem = vm.lineItems.findIndex(lineItem => {
          return lineItem.variant.id == vm.variant.id
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

  watch: {
    confirmedSelection() {
      this.addToCart()
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
    ...mapMutations('cart', ['showCart']),
    addToCart() {
      if (this.allOptionsSelected) {
        let lineItem = {
          image: this.product.featuredMedia,
          title: this.product.title,
          variant: this.variant,
          quantity: this.quantity,
          productId: this.product.id,
          handle: this.product.handle
        }
        this.addLineItem(lineItem)
        this.showCart()
      }
    }
  }
}
</script>
