<template>
  <div class="nacelle product-data-load">
    <slot
      v-if="product || products.length > 0"
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
      product: undefined,
      products: []
    }
  },
  computed: {
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
          if (
            this.singleProduct ||
            result.length === 1
          ) {
            this.product = result[0]
          }

          this.products = result
        }
      })
  }
}
</script>

<style>

</style>