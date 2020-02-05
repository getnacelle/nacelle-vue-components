<template>
  <div class="variant-select nacelle">
    <product-options
      v-show="showProductOptions"
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
        v-if="
          allOptionsSelected &&
            selectedVariant &&
            selectedVariant.availableForSale &&
            showQuantitySelect
        "
      >
        <quantity-selector :quantity.sync="quantity" />
      </div>
      <div class="column auto">
        <product-add-to-cart-button
          :quantity="quantity"
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
import QuantitySelector from './QuantitySelector'
import ProductAddToCartButton from './ProductAddToCartButton'
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
  data() {
    return {
      quantity: 0
    }
  },
  mixins: [allOptionsSelected, availableOptions],
  components: {
    ProductOptions,
    QuantitySelector,
    ProductAddToCartButton
  },
  computed: {
    showProductOptions() {
      return (
        Array.isArray(this.allOptions) &&
        this.allOptions.length >= 1 &&
        this.allOptions[0].values.length > 1 &&
        this.product.availableForSale
      )
    }
  }
}
</script>

<style></style>
