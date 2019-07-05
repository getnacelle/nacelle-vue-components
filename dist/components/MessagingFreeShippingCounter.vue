<template>
  <p>
    <span v-if="!freeShippingThresholdPassed">
      Only
      <product-price class="free-shipping" :price="amountUntilFreeShipping" />left to get free shipping!
    </span>
    <span v-else>You get free shipping!</span>
  </p>
</template>

<script>
import ProductPrice from './ProductPrice'
import { mapGetters } from 'vuex'
export default {
  components: {
    ProductPrice
  },
  computed: {
    ...mapGetters('cart', [
      'freeShippingThresholdPassed',
      'amountUntilFreeShipping'
    ])
  }
}
</script>

<style lang="scss" scoped>
.free-shipping {
  font-weight: bold;
}
</style>
