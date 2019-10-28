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
      let vm = this
      let productIDs = this.lineItems.map(item => {
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
      let vm = this
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
    //// PAGE VIEW METHODS /////////////////////////////////
    facebookPageView() {
      fbq('track', 'PageView')
    },
    googleAnalyticsPageView() {
      ga('send', 'pageview', this.logEntry.page.pageUrl)
    },

    //// PRODUCT VIEW METHODS //////////////////////////////
    facebookProductView() {
      let vm = this
      fbq('track', 'ViewContent', {
        content_ids: vm.decodeBase64VariantId(
          vm.logEntry.product.variants[0].id
        ),
        content_name: vm.logEntry.product.title,
        content_type: 'product',
        product_catalog_id: vm.facebookCatalogID
      })
    },

    googleAnalyticsProductView() {
      let vm = this
      ga('ec:addProduct', {
        id: vm.decodeBase64ProductId(vm.logEntry.product.productId),
        name: vm.logEntry.product.title
      })
      ga('ec:setAction', 'detail')
      ga('send', 'pageview')
    },

    //// ADD TO CART METHODS ///////////////////////////////
    facebookAddToCart() {
      let vm = this
      fbq('track', 'AddToCart', {
        content_ids: vm.decodeBase64VariantId(vm.logEntry.variant.id),
        content_name: vm.logEntry.product.title,
        content_type: 'product',
        value: vm.logEntry.product.variant.price,
        currency: 'USD',
        product_catalog_id: vm.facebookCatalogID
      })
    },

    googleAnalyticsAddToCart() {
      let vm = this
      ga('ec:addProduct', {
        id: vm.decodeBase64ProductId(vm.logEntry.product.id),
        name: vm.logEntry.product.title
      })
      ga('ec:setAction', 'add')
      ga('send', 'event', 'UX', 'click', 'add to cart')
    },

    //// REMOVE FROM CART METHODS ///////////////////////////////
    googleAnalyticsRemoveFromCart() {
      let vm = this
      ga('ec:addProduct', {
        id: vm.logEntry.lineItem.productId,
        name: vm.logEntry.lineItem.title
      })
      ga('ec:setAction', 'remove')
      ga('send', 'event', 'UX', 'click', 'remove from cart')
    },

    //// CHECKOUT INITIATION METHODS ///////////////////////////////
    facebookCheckoutInitiate() {
      let vm = this
      fbq('track', 'InitiateCheckout', {
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
</script>