<template>
  <div class="columns is-multiline is-paddingless">
    <div
      v-for="product in products"
      :key="product.id"
      class="column is-half-tablet is-one-third-desktop"
    >
      <product-card :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard'

export default {
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  padding-bottom: 3rem;
}
</style>

