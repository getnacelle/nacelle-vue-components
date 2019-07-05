<template>
  <div class="product-grid section">
    <div class="container">
      <h3 class="title has-text-centered">
        {{ title }}
      </h3>
      <div class="columns is-multiline is-paddingless">
        
      </div>
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
    }
  }
}
</script>

<style>

</style>
