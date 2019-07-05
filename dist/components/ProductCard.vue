<template>
  <div class="product-card">
    <product-image :source="product.featuredMedia.src || undefined"/>
    <div class="product-card-details">
      <product-title :title="product.title"/>
      <product-price :price="product.price.max" />
    </div>
    <div class="product-card-actions">
      <product-quantity-update :variantId="product.variant.id"/>
      <product-add-to-cart-button 
        :image="product.featuredMedia"
        :title="product.title"
        :productId="product.productId"
        :handle="product.handle"
        :variant="product.variant"
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
    product: {
      type: Object,
      default: () => {
        return {
          price: {
            min: '0.0',
            max: '0.00'
          },
          title: null,
          featuredMedia: {
            src: undefined
          },
          productId: null,
          handle: null,
          variant: {
            id: null
          }
        }
      }
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

.product-card-details /deep/ .title {
  flex-basis: 60%;
}
</style>

