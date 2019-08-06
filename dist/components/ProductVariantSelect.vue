<template>
  <div>
    <product-options
      v-show="product.options[0].values.length > 1"
      :options="product.options"
      v-on:selectedOptionsSet="setSelected"
    />
    <div class="columns">
      <div class="column is-half" v-if="allOptionsSelected">
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
import { mapGetters } from 'vuex'
// import allOptionsSelected from '../mixins/allOptionsSelected'
export default {
  props: {
    product: {
      type: Object
    },
    variant: {
      type: Object
    }
  },
  // mixins: [allOptionsSelected],
  components: {
    ProductOptions,
    ProductQuantityUpdate,
    ProductAddToCartButton
  }
}
</script>

<style>
</style>
