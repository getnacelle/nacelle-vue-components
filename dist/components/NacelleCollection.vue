<template>
  <div class="nacelle collection-data-load">
    <slot
      v-if="collection"
      :collection="collection"
      :products="products"
    />
    <button
      v-if="showButton"
      @click="fetchProducts"
      class="nacelle button">
      {{ buttonText }}
    </button>
    <div
      v-else
      ref="fetchMore"
      class="fetch-more-component"
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
    paginate: {
      type: Boolean,
      default: false
    },
    productsPerPage: {
      type: Number,
      default: 30
    },
    useButtonLoadMore: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Load More'
    }
  },
  data () {
    return {
      collection: undefined,
      products: [],
      productIndex: 0
    }
  },
  computed: {
    showButton() {
      return (
        this.useButtonLoadMore &&
        this.collection &&
        Array.isArray(this.collection.products) &&
        this.productIndex < this.collection.products.length
      )
    }
  },
  created () {
    if (process.browser || process.client) {
      this.$nacelle
        .collection(this.handle)
        .then((result) => {
          if (result) {
            this.collection = result
            this.products = []
            this.fetchProducts()
          }
        })
    }
  },
  mounted() {
    if (
      process.browser ||
      process.client &&
      !this.useButtonLoadMore
    ) {
      const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
      const onChange = (changes, observer) => {
        if (changes[0].isIntersecting) {
          this.fetchProducts()
        }
      }

      if (this.$refs.fetchMore) {
        const observer = new IntersectionObserver(onChange, options)
        const observee = this.$refs.fetchMore

        observer.observe(observee)
      }
    }
  },
  methods: {
    fetchProducts() {
      if (process.browser || process.client) {
        if (this.collection && Array.isArray(this.collection.products)) {
          let handles = this.collection.products

          if (this.paginate) {
            handles = this.collection.products.slice(
              this.productIndex,
              this.productIndex + this.productsPerPage
            )
          }

          this.$nacelle.products(handles).then(result => {
            if (result && result.length > 0) {
              // filter out non-existant products
              const validProducts = result.filter(product => {
                return (
                  product &&
                  product.id &&
                  product.handle &&
                  product.title
                )
              })

              this.products = [
                ...this.products,
                ...validProducts
              ]

              this.productIndex = this.products.length
            }
          })
        }
      }
    }
  }
}
</script>

<style>

</style>