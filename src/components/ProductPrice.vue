<template>
  <span>
    {{price | currency({
    symbol: '$',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: false
    })}}
  </span>
</template>

<script>
import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter)
export default {
  props: {
    price: [String, Number],
    currencyCode: {
      type: String,
      default: 'USD'
    },
    showCurrencyCode: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  margin-bottom: 1rem;
}
</style>
