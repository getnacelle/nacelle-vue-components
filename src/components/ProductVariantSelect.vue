<template>
  <div class="variant-select nacelle">
    <product-options
      v-show="allOptions[0].values.length > 1 && product.availableForSale"
      :options="allOptions"
      :variant="selectedVariant"
      v-on:selectedOptionsSet="setSelected"
      :variants="product.variants"
      v-on:clear="selectedOptions = []"
    />
    <slot name="above-button"></slot>
    <div class="columns is-mobile">
      <div
        class="column auto"
        v-if="allOptionsSelected && selectedVariant && selectedVariant.availableForSale"
      >
        <product-quantity-update
          v-if="showQuantitySelect"
          :product="product"
          :variant="selectedVariant"
          :allOptionsSelected="allOptionsSelected"
        />
      </div>
      <div class="column auto">
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
    },
    showQuantitySelect: {
      type: Boolean,
      default: true
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
