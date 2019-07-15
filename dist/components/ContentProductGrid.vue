<template>
  <div class="product-grid section">
    <div class="container">
      <h3 class="title has-text-centered">
        {{ title }}
      </h3>
      <product-grid :products="products" :columns="columns" />
    </div>
  </div>
</template>

<script>
import ProductGrid from './ProductGrid'

export default {
  components: {
    ProductGrid
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style>

</style>
