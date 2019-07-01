<template>
  <div class="columns is-marginless is-mobile flyout-cart-item">
    <div class="column is-4">
      <product-image :source="item.image.source" :alt="item.title"/>
    </div>
    <div class="column is-8">
      <product-title class="flyout-item-title" element="h4" :title="item.title"/>

      <div class="flyout-item-details columns is-marginless is-paddingless">
        <product-price class="flyout-item-price" :price="item.price"/>
        <product-quantity-update :variantId="item.variant.id"/>
        <cart-flyout-item-remove-button :variantId="item.variant.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from './ProductImage'
import ProductTitle from './ProductTitle'
import ProductPrice from './ProductPrice'
import CartFlyoutItemRemoveButton from './CartFlyoutItemRemoveButton'
import ProductQuantityUpdate from './ProductQuantityUpdate'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    pathFragment: {
      type: String,
      default: '/products/'
    }
  },
  components: {
    ProductImage,
    ProductTitle,
    ProductPrice,
    CartFlyoutItemRemoveButton,
    ProductQuantityUpdate
  }
}
</script>

<style lang="scss" scoped>
.flyout-cart-item {
  padding: 1rem;
}
.flyout-item-title {
  font-size: 16pt;
}
.flyout-item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flyout-item-price {
  margin-bottom: 0;
}
</style>
