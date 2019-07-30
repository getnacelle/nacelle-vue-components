<template>
  <div>
    <product-options
      v-show="product.options[0].values.length > 1"
      :options="product.options"
      v-on:allOptionsSelected="allOptionsSelected = true"
    />
    <product-quantity-update
      :product="product"
      :variant="variant"
      :allOptionsSelected="allOptionsSelected"
    />
    <product-add-to-cart-button
      :product="product"
      :variant="variant"
      :allOptionsSelected="allOptionsSelected"
    />
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
  }
}
</script>

<style>
</style>
