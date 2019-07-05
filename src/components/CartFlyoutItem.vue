<template>
  <div class="columns is-marginless is-mobile flyout-cart-item">
    <router-link class="column is-3" :to="`products/${item.handle}`" @click.native="hideCart">
      <product-image :source="item.image.thumbnailSrc" :alt="item.title" />
    </router-link>

    <div class="column is-9">
      <product-title class="flyout-item-title" element="h4" :title="item.title" />
      <product-variant-title class="flyout-item-variant-title" :title="item.variant.title" />
      <div class="flyout-item-details columns is-marginless is-paddingless">
        <product-price class="flyout-item-price" :price="item.variant.price" />
        <product-quantity-update :variantId="item.variant.id" />
        <cart-flyout-item-remove-button :variantId="item.variant.id" />
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
import ProductVariantTitle from './ProductVariantTitle'
import { mapMutations } from 'vuex'
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
    ProductQuantityUpdate,
    ProductVariantTitle
  },
  methods: {
    ...mapMutations('cart', ['hideCart'])
  }
}
</script>

<style lang="scss" scoped>
.flyout-cart-item {
  padding: 1rem;
}
.flyout-item-title {
  font-size: 16pt;
  margin-bottom: 0.7rem;
}
.flyout-item-variant-title {
  margin-bottom: 0.5rem;
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
