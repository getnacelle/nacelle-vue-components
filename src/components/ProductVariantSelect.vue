<template>
  <div>
    <product-options
      v-show="product.options[0].values.length > 1"
      :options="product.options"
      v-on:allOptionsSelected="allOptionsSelected = true"
      v-on:confirmedSelection="emitSelectedOptions"
    />
    <div class="columns">
      <div class="column is-half">
        <product-quantity-update
          :product="product"
          :variant="variant"
          :allOptionsSelected="allOptionsSelected"
        />
      </div>
      <div class="column is-half">
        <product-add-to-cart-button
          :product="product"
          :variant="variant"
          :allOptionsSelected="allOptionsSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductOptions from './ProductOptions'
import ProductQuantityUpdate from './ProductQuantityUpdate'
import ProductAddToCartButton from './ProductAddToCartButton'
export default {
  props: {
    product: {
      type: Object
    },
    variant: {
      type: Object
    }
  },
  data() {
    return {
      allOptionsSelected: false
    }
  },
  components: {
    ProductOptions,
    ProductQuantityUpdate,
    ProductAddToCartButton
  },
  methods: {
    emitSelectedOptions(options) {
      this.$emit('selectedOptions', options)
    }
  }
}
</script>

<style>
</style>
