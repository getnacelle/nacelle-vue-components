<template>
  <div class="flyout">
    <cart-flyout-header/>
    <div class="cart-items">
      <cart-flyout-item v-for="item in lineItems" :key="item.productId" :item="item"/>
    </div>
  </div>
</template>

<script>
import CartFlyoutHeader from './CartFlyoutHeader'
import CartFlyoutItem from './CartFlyoutItem'
import { mapState } from 'vuex'
export default {
  components: {
    CartFlyoutHeader,
    CartFlyoutItem
  },
  computed: {
    ...mapState('cart', ['lineItems'])
  }
}
</script>

<style lang="scss" scoped>
.flyout {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 28rem;
  border-left: 1px solid #dedede7a;
  box-shadow: 20px 0px 20px 20px #e6e6e6c4;
}
</style>
