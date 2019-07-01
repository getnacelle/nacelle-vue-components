<template>
  <span>{{productPrice}}</span>
</template>

<script>
import Dinero from 'dinero.js'
export default {
  props: {
    price: String,
    currencyCode: {
      type: String,
      default: 'USD'
    },
    showCurrencyCode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productPrice() {
      let price = Math.round(this.price * 100)
      let currencyCode
      if (this.showCurrencyCode) {
        currencyCode = this.currencyCode
      } else {
        currencyCode = ''
      }
      let priceObject = Dinero({
        amount: price,
        currency: this.currencyCode
      })
      if (priceObject.hasCents()) {
        return `${priceObject.toFormat('$0,0.00')} ${currencyCode}`
      } else {
        return `${priceObject.toFormat('$0,0')} ${currencyCode}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  margin-bottom: 1rem;
}
</style>
