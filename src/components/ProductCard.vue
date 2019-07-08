<template>
  <div class="product-card">
    <product-image :source="mediaSrc"/>
    <div class="product-card-details">
      <router-link :to="`${pathFragment}${product.handle}`">
        <product-title :title="product.title"/>
      </router-link>
      <product-price :price="product.priceRange.max" />
    </div>
    <div class="product-card-actions">
      <product-quantity-update :variantId="currentVariantId" />
      <product-add-to-cart-button 
        :image="product.featuredMedia"
        :title="product.title"
        :productId="product.productId"
        :handle="product.handle"
        :variant="currentVariant"
      />
    </div>
  </div>
</template>

<script>
import ProductImage from './ProductImage'
import ProductTitle from './ProductTitle'
import ProductPrice from './ProductPrice'
import ProductQuantityUpdate from './ProductQuantityUpdate'
import ProductAddToCartButton from './ProductAddToCartButton'

export default {
  components: {
    ProductImage,
    ProductTitle,
    ProductPrice,
    ProductQuantityUpdate,
    ProductAddToCartButton
  },
  props: {
    pathFragment: {
      type: String,
      default: '/products/'
    },
    product: {
      type: Object,
      default: () => {
        return {
          priceRange: {
            min: '0.0',
            max: '0.00'
          },
          title: null,
          featuredMedia: {
            src: undefined
          },
          productId: null,
          handle: '',
          variants: []
        }
      }
    }
  },
  data() {
    return {
      selectedVariant: null
    }
  },
  computed: {
    currentVariant() {
      if (this.selectedVariant === null) {
        if (this.product.variants.length > 0) {
          return this.product.variants[0]
        }

        return undefined
      }

      return this.selectedVariant
    },
    currentVariantId() {
      if (this.currentVariant && this.currentVariant.id) {
        return this.currentVariant.id
      }

      return undefined
    },
    mediaSrc() {
      if (
        this.product &&
        this.product.featuredMedia &&
        this.product.featuredMedia.src
      ) {
        return this.product.featuredMedia.src
      }

      return undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card-details,
.product-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card-details /deep/ a {
  flex-basis: 60%;
}
</style>

