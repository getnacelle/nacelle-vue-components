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
        <product-quantity-update
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
  },
  computed: {
    showProductOptions() {
      return (
        Array.isArray(this.allOptions) &&
        this.allOptions.length > 1 &&
        this.allOptions[0].values.length > 1 &&
        this.product.availableForSale
      )
    }
  }
}
</script>

<style></style>
