<template>
  <div class="nacelle collection-data-load">
    <slot v-if="collection" :collection="collection" :products="products" />
    <button v-if="showButton" @click="fetchProducts" class="nacelle button">{{ buttonText }}</button>
    <div v-else ref="fetchMore" class="fetch-more-component" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

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
  data() {
    return {
      collection: undefined,
      products: [],
      productIndex: 0,
      isLoadingProducts: false,
      isObserverInitialized: false
    }
  },
  computed: {
    ...mapGetters('collections', ['getCollection']),
    showButton() {
      return (
        this.useButtonLoadMore &&
        this.collection &&
        Array.isArray(this.collection.products) &&
        this.productIndex < this.collection.products.length
      )
    }
  },
  created() {
    if (process.browser || process.client) {
      const storeCollection = this.getCollection(this.handle)

      if (storeCollection) {
        this.collection = storeCollection.collection
        this.products = storeCollection.products
      } else {
        this.$nacelle.collection(this.handle).then(result => {
          if (result) {
            this.collection = result
            this.products = []
            this.addCollection({
              handle: this.handle,
              collection: this.collection,
              products: this.products,
              productIndex: 0
            })
            this.fetchProducts()
          }
        })
      }
    }
  },
  mounted() {
    this.initObserver()
  },
  updated() {
    this.initObserver()
  },
  methods: {
    ...mapMutations('collections', ['addCollection', 'updateCollection']),
    onChange(changes) {
      if (changes[0].isIntersecting) {
        this.fetchProducts()
      }
    },
    initObserver() {
      if (
        !this.isObserverInitialized &&
        (process.browser || process.client) &&
        !this.useButtonLoadMore
      ) {
        const options = {
          root: null,
          rootMargin: '100px',
          threshold: 0.1
        }

        if (this.$refs.fetchMore) {
          const observer = new IntersectionObserver(this.onChange, options)
          const observee = this.$refs.fetchMore

          observer.observe(observee)
          this.isObserverInitialized = true
        }
      }
    },
    fetchProducts() {
      if (
        !this.isLoadingProducts &&
        (process.browser || process.client) &&
        this.collection &&
        Array.isArray(this.collection.products) &&
        this.products.length < this.collection.products.length
      ) {
        let handles = this.collection.products

        this.isLoadingProducts = true

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
              return product && product.id && product.handle && product.title
            })

            this.products = [...this.products, ...validProducts]
            this.productIndex = this.products.length
            this.updateCollection({
              handle: this.handle,
              collection: this.collection,
              products: this.products,
              productIndex: this.productIndex
            })
            this.isLoadingProducts = false
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
