<template>
  <div class="subtotal" v-if="cartSubtotal">
    <h4>
      <span>Subtotal:</span>
      <product-price :price="cartSubtotal" />
    </h4>
  </div>
</template>

<script>
import ProductPrice from './ProductPrice'
import { mapGetters } from 'vuex'
export default {
  components: {
    ProductPrice
  },
  computed: {
    ...mapGetters('cart', ['cartSubtotal'])
  }
}
</script>

<style lang='scss' scoped>
.subtotal {
  border-top: 1px solid #dedede;
  padding: 1.5rem 0;
}
h4 {
  font-size: 14pt;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  color: #616161;
  span:first-child {
    margin-right: 0.5rem;
  }
}
</style>
