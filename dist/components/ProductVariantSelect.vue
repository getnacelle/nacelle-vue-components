<template>
  <div>
    <product-options
      v-show="allOptions[0].values.length > 1"
      :options="allOptions"
      :variant="selectedVariant"
      v-on:selectedOptionsSet="setSelected"
      :variants="product.variants"
      v-on:clear="selectedOptions = []"
    />
    <div class="columns is-mobile">
      <div class="column is-half" v-if="allOptionsSelected && selectedVariant">
        <product-quantity-update
          :product="product"
          :variant="selectedVariant"
          :allOptionsSelected="allOptionsSelected"
        />
      </div>
      <div class="column is-half">
        <product-add-to-cart-button
          :product="product"
          :variant="selectedVariant"
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
import allOptionsSelected from '../mixins/allOptionsSelected'
import availableOptions from '../mixins/availableOptions'
export default {
  props: {
    product: {
      type: Object
    },
    variant: {
      type: Object
    }
  },
  mixins: [allOptionsSelected, availableOptions],
  components: {
    ProductOptions,
    ProductQuantityUpdate,
    ProductAddToCartButton
  }
}
</script>

<style>
</style>
