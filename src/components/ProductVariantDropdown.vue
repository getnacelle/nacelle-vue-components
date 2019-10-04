<template>
  <div class="variant-dropdown nacelle">
    <div class="select">
      <select
        v-model="selectedVariant"
        @change="$emit('variant-selected', { selectedVariant })"
      >
        <option
          v-for="variant in product.variants"
          :key="variant.id"
          :value="variant"
        >
          {{ variant.title }}
        </option>
      </select>
    </div>
    <div v-if="showAddToCart && selectedVariant" class="columns is-mobile">
      <div class="column is-half">
        <product-quantity-update
          :product="product"
          :variant="selectedVariant"
          :allOptionsSelected="true"
        />
      </div>
      <div class="column is-half">
        <product-add-to-cart-button
          :product="product"
          :variant="selectedVariant"
          :allOptionsSelected="true"
          :onlyOneOption="true"
        >
          <slot name="add-to-cart-button" />
        </product-add-to-cart-button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductQuantityUpdate from './ProductQuantityUpdate'
import ProductAddToCartButton from './ProductAddToCartButton'

export default {
  components: {
    ProductQuantityUpdate,
    ProductAddToCartButton
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          id: '',
          handle: '',
          title: '',
          variants: [],
          price: {},
          media: [],
          featuredMedia: {}
        }
      }
    },
    variant: {
      type: Object,
      default: () => {
        return {
          id: '',
          title: '',
          handle: '',
          price: '0.00',
          availableForSale: false
        }
      }
    },
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectedVariant: undefined
    }
  },
  created () {
    if (this.variant) {
      this.selectedVariant = this.variant
    } else if (
      this.product &&
      this.product.variants &&
      this.product.variants.length > 0
    ) {
      this.selectedVariant = this.product.variants[0]
    }
  }
}
</script>

<style lang="scss">
.variant-dropdown .select,
.variant-dropdown select {
  width: 100%;
}

.variant-dropdown .select {
  margin-bottom: 1rem;
}

.variant-dropdown /deep/ .button {
  width: 100%;
}
</style>