<template>
  <div class="nacelle product-data-load">
    <slot
      v-if="product && products.length > 0"
      :product="product"
      :products="products"
    />
  </div>
</template>

<script>
export default {
  props: {
    handle: {
      type: String,
      default: ''
    },
    handles: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data () {
    return {
      products: []
    }
  },
  computed: {
    product () {
      if (this.products.length > 0) {
        return this.products[0]
      }

      return undefined
    },
    singleProduct () {
      if (
        this.handle.length > 0 &&
        this.handles.length === 0
      ) {
        return true
      }

      return false
    }
  },
  created () {
    if (process.client) {
      let handlesArr = []

      if (this.singleProduct) {
        handlesArr.push(this.handle)
      } else {
        handlesArr = this.handles
      }

      this.$nacelle
        .products(handlesArr)
        .then((result) => {
          if (result && result.length > 0) {
            // filter out non-existant products
            this.products = result.filter(product => {
              return (
                product &&
                product.id &&
                product.handle &&
                product.title
              )
            })
          }
        })
    }
  }
}
</script>

<style>

</style>