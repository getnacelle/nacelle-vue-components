<template>
  <div></div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('events', ['log']),
    ...mapState(['facebookCatalogID']),
    ...mapGetters('cart', ['quantityTotal']),
    ...mapState('cart', ['lineItems']),
    productIDs() {
      const vm = this
      const productIDs = this.lineItems.map(item => {
        return vm.decodeBase64ProductId(item.productId)
      })
      return productIDs
    },
    logEntry() {
      return JSON.parse(JSON.stringify(this.log)).pop()
    }
  },
  watch: {
    log(log) {
      const vm = this
      switch (vm.logEntry.eventType) {
        case 'PAGE_VIEW':
          vm.facebookPageView()
          vm.googleAnalyticsPageView()
          break
        case 'PRODUCT_VIEW':
          vm.facebookProductView()
          vm.googleAnalyticsProductView()
          break
        case 'ADD_TO_CART':
          vm.facebookAddToCart()
          vm.googleAnalyticsAddToCart()
          break
        case 'REMOVE_FROM_CART':
          vm.googleAnalyticsRemoveFromCart()
          break
        case 'CHECKOUT':
          vm.facebookCheckoutInitiate()
          break
      }
    }
  },
  methods: {
    decodeBase64ProductId(encodedId) {
      const decodedId = Buffer.from(encodedId, 'base64').toString('ascii')
      return decodedId.split('gid://shopify/Product/')[1]
    },
    decodeBase64VariantId(encodedId) {
      const decodedId = Buffer.from(encodedId, 'base64').toString('ascii')
      return decodedId.split('gid://shopify/ProductVariant/')[1]
    },
    /// / PAGE VIEW METHODS /////////////////////////////////
    facebookPageView() {
      if (window.fbq) {
        window.fbq('track', 'PageView')
      }
    },
    googleAnalyticsPageView() {
      if (window.ga) {
        window.ga('send', 'pageview', this.logEntry.url)
      }
    },
    /// / PRODUCT VIEW METHODS //////////////////////////////
    facebookProductView() {
      const vm = this
      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_ids: vm.decodeBase64VariantId(
            vm.logEntry.payload.product.variants[0].id
          ),
          content_name: vm.logEntry.payload.product.title,
          content_type: 'product',
          product_catalog_id: vm.facebookCatalogID
        })
      }
    },
    googleAnalyticsProductView() {
      const vm = this
      if (window.ga) {
        window.ga('ec:addProduct', {
          id: vm.decodeBase64ProductId(vm.logEntry.payload.product.productId),
          name: vm.logEntry.payload.product.title
        })
        window.ga('ec:setAction', 'detail')
        window.ga('send', 'pageview')
      }
    },
    /// / ADD TO CART METHODS ///////////////////////////////
    facebookAddToCart() {
      const vm = this
      if (window.fbq) {
        window.fbq('track', 'AddToCart', {
          content_ids: vm.decodeBase64VariantId(
            vm.logEntry.payload.product.variant.id
          ),
          content_name: vm.logEntry.payload.product.title,
          content_type: 'product',
          value: vm.logEntry.payload.product.variant.price,
          currency: 'USD',
          product_catalog_id: vm.facebookCatalogID
        })
      }
    },
    googleAnalyticsAddToCart() {
      const vm = this
      if (window.ga) {
        window.ga('ec:addProduct', {
          id: vm.decodeBase64ProductId(vm.logEntry.payload.product.productId),
          name: vm.logEntry.payload.product.title
        })
        window.ga('ec:setAction', 'add')
        window.ga('send', 'event', 'UX', 'click', 'add to cart')
      }
    },
    /// / REMOVE FROM CART METHODS ///////////////////////////////
    googleAnalyticsRemoveFromCart() {
      const vm = this
      if (window.ga) {
        window.ga('ec:addProduct', {
          id: vm.logEntry.payload.product.productId,
          name: vm.logEntry.payload.product.title
        })
        window.ga('ec:setAction', 'remove')
        window.ga('send', 'event', 'UX', 'click', 'remove from cart')
      }
    },
    /// / CHECKOUT INITIATION METHODS ///////////////////////////////
    facebookCheckoutInitiate() {
      const vm = this
      if (window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          content_ids: vm.productIDs.map(id => {
            return vm.decodeBase64ProductId(id)
          }),
          content_type: 'product',
          num_items: vm.quantityTotal,
          product_catalog_id: vm.facebookCatalogID
        })
      }
    }
  }
}
</script>
